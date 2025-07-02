import React, { useRef, useEffect, useCallback } from 'react';
import './DetectiveWeaselAvatar.css'; // Import the CSS for smoke animations

interface DetectiveWeaselAvatarProps {
  visible?: boolean;
  assistantText?: string;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: "smoke" | "electric";
}

export const DetectiveWeaselAvatar: React.FC<DetectiveWeaselAvatarProps> = ({
  visible = true,
  assistantText = "",
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation loop function with the improved particle system
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with transparency (no dark background for overlay effect)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get canvas center for character positioning
    const characterX = canvas.width / 2;
    const characterY = canvas.height / 2;
    const characterWidth = canvas.width * 0.8; // Scale to canvas
    const characterHeight = canvas.height * 0.8;

    // Spawn smoke particles around the feet area - much lower position
    if (Math.random() < 0.4) {
      const footY = canvas.height - 30; // Position at very bottom of canvas
      const particle: Particle = {
        x: characterX + (Math.random() - 0.5) * characterWidth * 0.6,
        y: footY + Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.05,
        vy: -0.3, // MUCH FASTER upward movement
        life: 0,
        maxLife: 200 + Math.random() * 100, // Shorter life so they disappear faster
        size: 15 + Math.random() * 10,
        type: "smoke",
      };
      particlesRef.current.push(particle);
    }

    // Spawn electric particles above the head area
    if (Math.random() < 0.08) {
      const headY = characterY - characterHeight / 2 - 30;
      const particle: Particle = {
        x: characterX + (Math.random() - 0.5) * 60,
        y: headY + Math.random() * 40,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: 30 + Math.random() * 20,
        size: 3 + Math.random() * 5,
        type: "electric",
      };
      particlesRef.current.push(particle);
    }

    // Update particles
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.life++;

      if (particle.type === "smoke") {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy *= 0.998; // Less friction so it keeps rising fast
        particle.vx *= 0.995; // Less horizontal friction too
      } else if (particle.type === "electric") {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.95;
        particle.vy *= 0.95;
      }

      return particle.life < particle.maxLife;
    });

    // Draw particles
    particlesRef.current.forEach((particle) => {
      const alpha = Math.max(0, 1 - particle.life / particle.maxLife);

      if (particle.type === "smoke") {
        const maxOpacity = 0.15;
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size);
        gradient.addColorStop(0, `rgba(128, 128, 128, ${alpha * maxOpacity})`);
        gradient.addColorStop(1, `rgba(128, 128, 128, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (particle.type === "electric") {
        ctx.fillStyle = `rgba(100, 255, 100, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = "rgba(100, 255, 100, 0.5)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(200, 255, 200, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Setup canvas and start animation
  useEffect(() => {
    if (!visible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Load the image
    const img = new Image();
    img.src = "https://pub-b5d9a50f6cc04d78835c4d16883b5aea.r2.dev/dfh-assets/dfh-avator/2.Detective-Weasel-Avator.png";

    img.onload = () => {
      console.log("✅ Detective Weasel image loaded");
      imageRef.current = img;
    };

    img.onerror = (e) => {
      console.error("❌ Detective Weasel image failed to load", e);
      // Fallback to local image
      img.src = "/models/detective-weasel.png";
    };

    // Set canvas size to match container
    const resizeCanvas = () => {
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    // Initial resize
    resizeCanvas();

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
      particlesRef.current = [];
    };
  }, [visible, animate]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Enhanced detective noir-style smoke effects surrounding the avatar */}
      <div className="absolute inset-0 overflow-visible pointer-events-none z-0">
        {/* Main smoke cloud surrounding the avatar */}
        <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-radial from-gray-800/30 to-transparent"></div>
      </div>

      {/* Canvas for enhanced particle effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20 w-full h-full"
      />

      {/* Detective Weasel Label */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-gradient-to-br from-green-400/60 via-green-500/50 to-green-600/70 backdrop-blur-sm px-3 py-1 rounded-md border border-green-300/70 shadow-lg shadow-green-500/30 inline-block relative">
          <div className="absolute inset-0 bg-gradient-to-t from-green-800/20 to-transparent rounded-md"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-green-200/20 to-transparent rounded-t-md"></div>
          <h2 className="text-white font-bold text-sm tracking-normal text-center whitespace-nowrap relative z-10 drop-shadow-sm">
            DETECTIVE WEASEL
          </h2>
        </div>
      </div>

      {/* Avatar Image with improved sizing and positioning */}
      <div className="flex justify-center items-start pt-4 relative z-10">
        <img
          src="https://pub-b5d9a50f6cc04d78835c4d16883b5aea.r2.dev/dfh-assets/dfh-avator/2.Detective-Weasel-Avator.png"
          alt="Detective Weasel Avatar"
          className="w-full h-auto max-w-none object-contain rounded-lg min-w-[280px] min-h-[350px]"
          onError={(e) => {
            console.error('Failed to load avatar image');
            // Fallback to local image
            e.currentTarget.src = '/models/detective-weasel.png';
          }}
        />
      </div>

      {/* Voice waves animation when speaking */}
      {assistantText && (
        <div className="absolute inset-0 rounded-lg z-5">
          <div className="absolute inset-2 rounded-lg border border-green-400/30 animate-ping"></div>
          <div className="absolute inset-4 rounded-lg border border-green-400/20 animate-ping [animation-delay:0.5s]"></div>
          <div className="absolute inset-6 rounded-lg border border-green-400/10 animate-ping [animation-delay:1s]"></div>
        </div>
      )}
    </div>
  );
};