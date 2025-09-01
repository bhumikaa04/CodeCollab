// src/components/SunBackground.jsx
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export default function SunBackground({ isDarkMode }) {
    const [clouds, setClouds] = useState([]);
    const [sunBrightness, setSunBrightness] = useState(1);

    const generateClouds = () => {
        const numberOfClouds = 10;
        const newClouds = [];
        
        for (let i = 0; i < numberOfClouds; i++) {
            const top = Math.random() * 70;
            const left = Math.random() * 100;
            const size = Math.random() * 120 + 60;
            const opacity = Math.random() * 0.3 + 0.4;
            const duration = Math.random() * 40 + 40;
            const delay = Math.random() * 20;
            // Generate a larger drift distance for a more noticeable wind effect
            const driftDistance = Math.random() * 100 + 50; 
            
            newClouds.push({
                id: i,
                top,
                left,
                size,
                opacity,
                duration,
                delay,
                driftDistance
            });
        }
        
        setClouds(newClouds);
    };

    useEffect(() => {
        if (!isDarkMode) {
            generateClouds();
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (isDarkMode) return;

        const interval = setInterval(() => {
            const randomBrightness = Math.random() * 0.3 + 0.7;
            setSunBrightness(randomBrightness);
        }, 5000);

        return () => clearInterval(interval);
    }, [isDarkMode]);

    if (isDarkMode) {
        return null;
    }

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-yellow-100 to-orange-200">
            <div
                className="absolute rounded-full sun-glow pulse"
                style={{
                    width: "240px",
                    height: "240px",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,250,180,1) 20%, rgba(255,220,100,0.8) 40%, rgba(255,180,50,0.4) 60%, rgba(255,150,50,0.2) 80%, rgba(255,130,50,0) 100%)",
                    boxShadow: "0 0 100px 50px rgba(255, 200, 50, 0.6), 0 0 200px 100px rgba(255, 150, 50, 0.3)",
                    filter: `brightness(${sunBrightness})`,
                    transition: "filter 2s ease-in-out"
                }}
            />
            {clouds.map((cloud) => (
                <div
                    key={cloud.id}
                    className="absolute cloud"
                    style={{
                        top: `${cloud.top}%`,
                        left: `${cloud.left}%`,
                        width: `${cloud.size}px`,
                        height: `${cloud.size * 0.6}px`,
                        opacity: cloud.opacity,
                        // This single animation handles both X and Y motion
                        animation: `float ${cloud.duration}s ease-in-out ${cloud.delay}s infinite`,
                        filter: "blur(3px)",
                        // Set the CSS variable for each cloud's drift distance
                        "--drift-distance": `${cloud.driftDistance}px`
                    }}
                >
                    <div className="w-full h-full bg-white rounded-full" />
                </div>
            ))}
            
            <style>{`
                @keyframes float {
                    0% {
                        transform: translateX(0) translateY(0);
                    }
                    50% {
                        transform: translateX(var(--drift-distance, 20px)) translateY(3px);
                    }
                    100% {
                        transform: translateX(0) translateY(0);
                    }
                }
                
                .cloud {
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.8);
                    box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.3);
                }
                
                @keyframes pulse {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.05);
                        opacity: 1;
                    }
                }
                
                .pulse {
                    animation: pulse 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}