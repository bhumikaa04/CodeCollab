import ThemeToggle from "./ThemeToggle";
import StarBackground from "./StarBackground";
import Navbar from "./Navbar";

export default function Home() {
    return (
        <>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* Background effects */}
            <StarBackground />
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            {/* footer */}
        </div>
        </>
    )
}