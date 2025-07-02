import React, { useEffect, useRef } from 'react';

interface ElectricArcAvatarProps {
    src: string;
    className?: string;
}

const ElectricArcAvatar: React.FC<ElectricArcAvatarProps> = ({ src, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Load the avatar image
        const img = new Image();
        img.onload = () => {
            startAnimation();
        };
        img.src = src;

        const draw3DButton = () => {
            const { width } = canvas;
            const centerX = width / 2;

            // Position the button directly underneath the "AI Assistant" and "OSINT AI Active" text
            const buttonX = centerX;
            const buttonY = 50; // Fixed position at top - directly below the text panel
            const buttonWidth = 140; // Slightly wider for better visibility
            const buttonHeight = 32; // Slightly taller for better visibility
            const cornerRadius = 8;

            // Create gradient for 3D effect
            const gradient = ctx.createLinearGradient(
                buttonX - buttonWidth / 2,
                buttonY - buttonHeight / 2,
                buttonX - buttonWidth / 2,
                buttonY + buttonHeight / 2
            );
            gradient.addColorStop(0, '#4ade80'); // Light green
            gradient.addColorStop(0.5, '#22c55e'); // Medium green
            gradient.addColorStop(1, '#16a34a'); // Dark green

            // Draw button shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 4;

            // Draw the button background
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(
                buttonX - buttonWidth / 2,
                buttonY - buttonHeight / 2,
                buttonWidth,
                buttonHeight,
                cornerRadius
            );
            ctx.fill();

            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Add highlight for 3D effect
            const highlightGradient = ctx.createLinearGradient(
                buttonX - buttonWidth / 2,
                buttonY - buttonHeight / 2,
                buttonX - buttonWidth / 2,
                buttonY - buttonHeight / 2 + 10
            );
            highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = highlightGradient;
            ctx.fill();

            // Draw button border
            ctx.strokeStyle = '#15803d';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw button text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Detective Weasel', buttonX, buttonY);
        };

        const drawElectricArc = (x1: number, y1: number, x2: number, y2: number, intensity: number) => {
            ctx.strokeStyle = `rgba(0, 255, 255, ${intensity})`;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';

            ctx.shadowColor = 'cyan';
            ctx.shadowBlur = 10;

            ctx.beginPath();
            ctx.moveTo(x1, y1);

            // Create jagged electric arc
            const segments = 8;
            for (let i = 1; i <= segments; i++) {
                const progress = i / segments;
                const midX = x1 + (x2 - x1) * progress;
                const midY = y1 + (y2 - y1) * progress;

                // Add random jagged effect
                const jag = (Math.random() - 0.5) * 20;
                ctx.lineTo(midX + jag, midY + jag);
            }

            ctx.stroke();
            ctx.shadowBlur = 0;
        };

        const drawElectricBurst = (x: number, y: number, intensity: number) => {
            const burstLines = 8;
            ctx.strokeStyle = `rgba(255, 255, 0, ${intensity})`;
            ctx.lineWidth = 1.5;
            ctx.lineCap = 'round';

            ctx.shadowColor = 'yellow';
            ctx.shadowBlur = 8;

            for (let i = 0; i < burstLines; i++) {
                ctx.beginPath();
                ctx.moveTo(x, y);

                const burstLength = 15 + Math.random() * 20;
                const burstDirection = (Math.random() * Math.PI * 2);

                const endX = x + Math.cos(burstDirection) * burstLength;
                const endY = y + Math.sin(burstDirection) * burstLength;

                ctx.lineTo(endX, endY);
                ctx.stroke();
            }

            ctx.shadowBlur = 0;
        };

        const smokeParticles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            life: number;
            maxLife: number;
            size: number;
        }> = [];

        const createSmokeParticle = () => {
            const { width, height } = canvas;
            const centerX = width / 2;
            const centerY = height / 2;

            smokeParticles.push({
                x: centerX + (Math.random() - 0.5) * 100,
                y: centerY + 120 + Math.random() * 20,
                vx: (Math.random() - 0.5) * 0.5,
                vy: -0.6 - Math.random() * 0.8,
                life: 0,
                maxLife: 250 + Math.random() * 150,
                size: 8 + Math.random() * 12
            });
        };

        const updateAndDrawSmoke = () => {
            if (Math.random() < 0.3) {
                createSmokeParticle();
            }

            for (let i = smokeParticles.length - 1; i >= 0; i--) {
                const particle = smokeParticles[i];

                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life++;

                particle.vy *= 0.999;
                particle.vx *= 0.99;

                if (particle.life > particle.maxLife) {
                    smokeParticles.splice(i, 1);
                    continue;
                }

                const alpha = Math.max(0, 1 - (particle.life / particle.maxLife));
                ctx.fillStyle = `rgba(200, 200, 200, ${alpha * 0.4})`;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        let time = 0;
        const startAnimation = () => {
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw the avatar image
                const { width, height } = canvas;
                const centerX = width / 2;
                const centerY = height / 2;
                const avatarSize = 120;

                ctx.drawImage(
                    img,
                    centerX - avatarSize / 2,
                    centerY - avatarSize / 2,
                    avatarSize,
                    avatarSize
                );

                // Draw electric arcs around the avatar
                const arcIntensity = 0.3 + Math.sin(time * 0.1) * 0.2;

                // Left arc
                drawElectricArc(
                    centerX - 80,
                    centerY - 40,
                    centerX - 40,
                    centerY + 20,
                    arcIntensity
                );

                // Right arc
                drawElectricArc(
                    centerX + 80,
                    centerY - 40,
                    centerX + 40,
                    centerY + 20,
                    arcIntensity
                );

                // Top arc
                drawElectricArc(
                    centerX - 30,
                    centerY - 80,
                    centerX + 30,
                    centerY - 80,
                    arcIntensity * 0.8
                );

                // Electric bursts
                if (Math.random() < 0.1) {
                    drawElectricBurst(
                        centerX + (Math.random() - 0.5) * 160,
                        centerY + (Math.random() - 0.5) * 160,
                        0.8
                    );
                }

                // Update and draw smoke
                updateAndDrawSmoke();

                // Draw the 3D button
                draw3DButton();

                time++;
                animationRef.current = requestAnimationFrame(animate);
            };

            animate();
        };

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [src]);

    return (
        <div
            ref={containerRef}
            className={`electric-arc-container relative w-full h-96 ${className}`}
        >
            <canvas
                ref={canvasRef}
                className="electric-arc-canvas absolute inset-0 w-full h-full z-[2] pointer-events-none"
            />
        </div>
    );
};

export default ElectricArcAvatar;
