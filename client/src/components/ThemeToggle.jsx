// ThemeToggle.jsx - The simplified file
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from "../lib/utils";

// Remove context exports from this file
// export const ThemeContext = createContext();
// export const useTheme = () => { ... }

// Receive props instead of managing state
export default function ThemeToggle({ currentTheme, setTheme }) {
    
    // Use the prop as the theme value
    const theme = currentTheme;

    const toggleTheme = (newTheme) => {
        if (newTheme) {
            setTheme(newTheme);
            if (newTheme === 'system') {
                localStorage.removeItem("theme");
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                setTheme(systemTheme);
            }
        } else {
            setTheme(prev => prev === 'light' ? 'dark' : 'light');
        }
    };
    
    return (
        // No longer provides context
        // <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="fixed top-5 right-10 z-50 flex items-center gap-2">
                {/* Simple toggle for mobile */}
                <button 
                    onClick={() => toggleTheme()}
                    className={cn(
                        "sm:hidden p-2 rounded-full transition-colors duration-300",
                        "bg-gray-200 dark:bg-gray-800",
                        "hover:bg-gray-300 dark:hover:bg-gray-700",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500"
                    )}
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? (
                        <Sun className="h-5 w-5 text-yellow-400" />
                    ) : (
                        <Moon className="h-5 w-5 text-gray-700" />
                    )}
                </button>

                {/* Full theme selector for desktop */}
                <div className="max-sm:hidden flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md border border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => toggleTheme('light')}
                        className={cn(
                            "p-2 rounded-full transition-all duration-300",
                            "hover:bg-gray-100 dark:hover:bg-gray-700",
                            theme === 'light' ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200" : "text-gray-600 dark:text-gray-300"
                        )}
                        aria-label="Light theme"
                    >
                        <Sun className="h-4 w-4" />
                    </button>
                    
                    <button
                        onClick={() => toggleTheme('system')}
                        className={cn(
                            "p-2 rounded-full transition-all duration-300",
                            "hover:bg-gray-100 dark:hover:bg-gray-700",
                            !localStorage.getItem("theme") ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200" : "text-gray-600 dark:text-gray-300"
                        )}
                        aria-label="System theme"
                    >
                        <Monitor className="h-4 w-4" />
                    </button>
                    
                    <button
                        onClick={() => toggleTheme('dark')}
                        className={cn(
                            "p-2 rounded-full transition-all duration-300",
                            "hover:bg-gray-100 dark:hover:bg-gray-700",
                            theme === 'dark' ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200" : "text-gray-600 dark:text-gray-300"
                        )}
                        aria-label="Dark theme"
                    >
                        <Moon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        // </ThemeContext.Provider>
    );
}