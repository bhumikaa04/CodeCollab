// src/contexts/ThemeContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const ThemeContext = createContext();

// Create a custom hook for easy consumption
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Create the provider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Initialize theme from localStorage or system preference
        const stored = localStorage.getItem("theme");
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = stored === 'system' ? systemTheme : stored || systemTheme;
        
        setTheme(initialTheme);
        
        // Apply theme class to document
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        
        // Apply theme class whenever theme changes
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Store preference
        if (theme === 'light' || theme === 'dark') {
            localStorage.setItem("theme", theme);
        } else {
            localStorage.removeItem("theme");
        }
    }, [theme, mounted]);

    useEffect(() => {
        // Listen for system preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e) => {
            // Only change if user hasn't explicitly set a preference
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = (newTheme) => {
        if (newTheme) {
            if (newTheme === 'system') {
                localStorage.removeItem("theme");
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                setTheme(systemTheme);
            } else {
                setTheme(newTheme);
            }
        } else {
            setTheme(prev => prev === 'light' ? 'dark' : 'light');
        }
    };

    const value = {
        theme,
        toggleTheme
    };

    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};