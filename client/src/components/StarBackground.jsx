// src/components/StarBackground.jsx
import { useEffect, useState } from "react";

export default function StarBackground({ isDarkMode }) {
    const [stars, setStars] = useState([]);
    const [meteors, setMeteors] = useState([]);

    const generateStars = () => {
        const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 10000);
        const newStars = [];

        for (let i = 0; i < numberOfStars; i++) {
            newStars.push({
                id: i,
                size: Math.random() * 3 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.5,
                animationDuration: Math.random() * 4 + 2,
                blink: Math.random() < 0.3
            });
        }
        setStars(newStars);
    };

    const generateMeteors = () => {
        const numberOfMeteors = 5;
        const newMeteors = [];

        for (let i = 0; i < numberOfMeteors; i++) {
            newMeteors.push({
                id: i,
                size: Math.random() * 2 + 1,
                x: Math.random() * 100,
                y: Math.random() * 20,
                delay: Math.random() * 15,
                animationDuration: Math.random() * 3 + 3,
            });
        }
        setMeteors(newMeteors);
    };

    // New useEffect to handle meteors and stars on component mount
    useEffect(() => {
        generateMeteors();
        generateStars(); // Generate stars and meteors only once
        
        // Add a resize listener for stars, which will be cleaned up
        window.addEventListener("resize", generateStars);
        return () => window.removeEventListener("resize", generateStars);
    }, []); // Empty dependency array ensures this runs only once

    // The component will only render the background if it's in dark mode
    if (!isDarkMode) {
        return null;
    }

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        position: "absolute",
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        opacity: star.opacity,
                        animation: star.blink
                            ? `shine ${star.animationDuration}s ease-in-out infinite`
                            : `pulse-subtle ${star.animationDuration}s ease-in-out infinite`,
                        backgroundColor: "white",
                        borderRadius: "50%",
                    }}
                />
            ))}

            {meteors.map((meteor) => (
                <div
                    key={meteor.id}
                    className="meteor"
                    style={{
                        width: `${meteor.size * 50}px`,
                        height: `${meteor.size * 2}px`,
                        left: `${meteor.x}%`,
                        top: `${meteor.y}%`,
                        animation: `meteor ${meteor.animationDuration}s linear infinite, shimmer 0.8s ease-in-out infinite`,
                    }}
                />
            ))}
        </div>
    );
}