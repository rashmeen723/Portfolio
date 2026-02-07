'use client';

import { useEffect, useRef } from 'react';
import Delaunay from 'delaunay-fast';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    let animationFrameId;

    // Settings - optimized for portfolio background
    const particleCount = 25;
    const flareCount = 4;
    const motion = 0.05;
    const color = '#051e3bff';
    const particleSizeBase = 0.8;
    const particleSizeMultiplier = 0.4;
    const lineWidth = 0.1;
    const linkChance = 75;
    const linkLengthMin = 2;
    const linkLengthMax = 4;
    const linkOpacity = 0.9;
    const linkFade = 20;
    const linkSpeed = 0.5;
    const renderParticles = true;
    const renderFlares = false; // Simplified for better performance
    const renderLinks = true;
    const flicker = true;
    const flickerSmoothing = 10;
    const randomMotion = true;
    const noiseLength = 500;
    const noiseStrength = 0.3;

    const mouse = { x: 0, y: 0 };
    let n = 0;
    const nAngle = (Math.PI * 2) / noiseLength;
    const nRad = 80;
    let nPos = { x: 0, y: 0 };
    const particles = [];
    const links = [];
    let points = [];
    let vertices = [];

    // Particle class
    class Particle {
      constructor() {
        this.x = random(-0.1, 1.1, true);
        this.y = random(-0.1, 1.1, true);
        this.z = random(0, 2);
        this.color = color;
        this.opacity = random(0.1, 0.4, true);
        this.flicker = 0;
        this.neighbors = [];
      }

      render() {
        const pos = position(this.x, this.y, this.z);
        const r = ((this.z * particleSizeMultiplier) + particleSizeBase) * (sizeRatio() / 1200);
        let o = this.opacity;

        if (flicker) {
          const newVal = random(-0.2, 0.2, true);
          this.flicker += (newVal - this.flicker) / flickerSmoothing;
          o += this.flicker;
          if (o > 0.5) o = 0.5;
          if (o < 0.05) o = 0.05;
        }

        context.fillStyle = this.color;
        context.globalAlpha = o;
        context.beginPath();
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
        context.globalAlpha = 1;
      }
    }

    // Link class
    class Link {
      constructor(startVertex, numPoints) {
        this.length = numPoints;
        this.verts = [startVertex];
        this.stage = 0;
        this.linked = [startVertex];
        this.distances = [];
        this.traveled = 0;
        this.fade = 0;
        this.finished = false;
      }

      render() {
        switch (this.stage) {
          case 0:
            const last = particles[this.verts[this.verts.length - 1]];
            if (last && last.neighbors && last.neighbors.length > 0) {
              const neighbor = last.neighbors[random(0, last.neighbors.length - 1)];
              if (this.verts.indexOf(neighbor) === -1) {
                this.verts.push(neighbor);
              }
            } else {
              this.stage = 3;
              this.finished = true;
            }

            if (this.verts.length >= this.length) {
              for (let i = 0; i < this.verts.length - 1; i++) {
                const p1 = particles[this.verts[i]];
                const p2 = particles[this.verts[i + 1]];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                this.distances.push(dist);
              }
              this.stage = 1;
            }
            break;

          case 1:
            if (this.distances.length > 0) {
              const points = [];
              for (let i = 0; i < this.linked.length; i++) {
                const p = particles[this.linked[i]];
                const pos = position(p.x, p.y, p.z);
                points.push([pos.x, pos.y]);
              }

              const linkSpeedRel = linkSpeed * 0.00001 * canvas.width;
              this.traveled += linkSpeedRel;
              const d = this.distances[this.linked.length - 1];

              if (this.traveled >= d) {
                this.traveled = 0;
                this.linked.push(this.verts[this.linked.length]);
                const p = particles[this.linked[this.linked.length - 1]];
                const pos = position(p.x, p.y, p.z);
                points.push([pos.x, pos.y]);

                if (this.linked.length >= this.verts.length) {
                  this.stage = 2;
                }
              } else {
                const a = particles[this.linked[this.linked.length - 1]];
                const b = particles[this.verts[this.linked.length]];
                const t = d - this.traveled;
                const x = ((this.traveled * b.x) + (t * a.x)) / d;
                const y = ((this.traveled * b.y) + (t * a.y)) / d;
                const pos = position(x, y, a.z);
                points.push([pos.x, pos.y]);
              }

              this.drawLine(points);
            } else {
              this.stage = 3;
              this.finished = true;
            }
            break;

          case 2:
            if (this.fade < linkFade) {
              this.fade++;
              const points = [];
              const alpha = (1 - (this.fade / linkFade)) * linkOpacity;
              for (let i = 0; i < this.verts.length; i++) {
                const p = particles[this.verts[i]];
                const pos = position(p.x, p.y, p.z);
                points.push([pos.x, pos.y]);
              }
              this.drawLine(points, alpha);
            } else {
              this.stage = 3;
              this.finished = true;
            }
            break;

          case 3:
            this.finished = true;
            break;
        }
      }

      drawLine(points, alpha = linkOpacity) {
        if (points.length > 1 && alpha > 0) {
          context.globalAlpha = alpha;
          context.beginPath();
          context.moveTo(points[0][0], points[0][1]);
          for (let i = 1; i < points.length; i++) {
            context.lineTo(points[i][0], points[i][1]);
          }
          context.strokeStyle = color;
          context.lineWidth = lineWidth;
          context.stroke();
          context.closePath();
          context.globalAlpha = 1;
        }
      }
    }

    // Utility functions
    function noisePoint(i) {
      const a = nAngle * i;
      return {
        x: nRad * Math.cos(a),
        y: nRad * Math.sin(a)
      };
    }

    function position(x, y, z) {
      return {
        x: (x * canvas.width) + ((((canvas.width / 2) - mouse.x + ((nPos.x - 0.5) * noiseStrength)) * z) * motion),
        y: (y * canvas.height) + ((((canvas.height / 2) - mouse.y + ((nPos.y - 0.5) * noiseStrength)) * z) * motion)
      };
    }

    function sizeRatio() {
      return Math.min(canvas.width, canvas.height);
    }

    function random(min, max, float) {
      return float ?
        Math.random() * (max - min) + min :
        Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function calculateDelaunay() {
      points = [];
      particles.forEach(particle => {
        points.push([particle.x * 1000, particle.y * 1000]);
      });

      vertices = Delaunay.triangulate(points);
      
      // Reset neighbors
      particles.forEach(particle => {
        particle.neighbors = [];
      });

      // Create triangles and assign neighbors
      const triangles = [];
      for (let i = 0; i < vertices.length; i += 3) {
        const tri = [vertices[i], vertices[i + 1], vertices[i + 2]];
        triangles.push(tri);
        
        // Assign neighbors
        tri.forEach(vertexIndex => {
          tri.forEach(neighborIndex => {
            if (vertexIndex !== neighborIndex && 
                particles[vertexIndex] && 
                !particles[vertexIndex].neighbors.includes(neighborIndex)) {
              particles[vertexIndex].neighbors.push(neighborIndex);
            }
          });
        });
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.scale(dpr, dpr);
    }

    function init() {
      resize();
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      // Calculate initial Delaunay triangulation
      calculateDelaunay();

      // Mouse move listener
      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      };

      canvas.addEventListener('mousemove', handleMouseMove);

      // Recalculate Delaunay on resize
      const handleResize = () => {
        resize();
        calculateDelaunay();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }

    function render() {
      if (randomMotion) {
        n = (n + 1) % noiseLength;
        nPos = noisePoint(n);
      }

      // Clear with slight transparency for trail effect
      context.fillStyle = 'rgba(15, 23, 42, 0.08)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Render particles
      if (renderParticles) {
        particles.forEach(particle => particle.render());
      }

      // Render links
      if (renderLinks) {
        // Occasionally start new links
        if (Math.random() * 100 > linkChance && particles.length > 0) {
          const length = random(linkLengthMin, linkLengthMax);
          const start = random(0, particles.length - 1);
          links.push(new Link(start, length));
        }

        // Update and render existing links
        for (let i = links.length - 1; i >= 0; i--) {
          if (links[i] && !links[i].finished) {
            links[i].render();
          } else {
            links.splice(i, 1);
          }
        }

        // Occasionally recalculate Delaunay for dynamic connections
        if (Math.random() < 0.01) { // 1% chance per frame
          calculateDelaunay();
        }
      }
    }

    // Initialize and start animation
    const cleanup = init();

    const animate = () => {
      render();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        background: 'transparent'
      }}
    />
  );
};

export default Starfield;