// Home.jsx - The corrected file
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Navbar from "./Navbar";
import SunBackground from "./SunBackground";
import StarBackground from "./StarBackground";

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState('light'); // Lift the theme state up

    useEffect(() => {
        setMounted(true);
        // Initialize theme from localStorage or system preference
        const stored = localStorage.getItem("theme");
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = stored === 'system' ? systemTheme : stored || systemTheme;
        setTheme(initialTheme);
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        if (theme === 'light' || theme === 'dark') {
            localStorage.setItem("theme", theme);
        } else {
            localStorage.removeItem("theme");
        }
    }, [theme, mounted]);

    // Handle system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <div className="min-h-screen overflow-x-hidden relative">
                {/* Pass theme state and setter as props */}
                <ThemeToggle currentTheme={theme} setTheme={setTheme} />
                
                {/* Background based on theme */}
                {theme === 'light' ? <SunBackground isDarkMode={false} /> : <StarBackground isDarkMode={true} />}
                
                {/* Other components */}
                <Navbar />
                <main className="relative z-10">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-4xl font-bold text-center mb-8">
                            Welcome to CodeCollab
                        </h1>
                        <p className="text-lg text-center max-w-2xl mx-auto">
                            Collaborate on code in real-time with your team. Perfect for interviews, 
                            pair programming, and learning together.
                        </p>
                    </div>
                </main>
                
                <footer className="relative z-10 py-6 text-center">
                    <p>© 2025 CodeCollab. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}