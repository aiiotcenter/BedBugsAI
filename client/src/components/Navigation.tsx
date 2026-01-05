import { Link } from "wouter";
import { Microscope } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Microscope className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-foreground">BedBug Detector</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/">
            <span className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/info">
            <span className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
              About Bedbugs
            </span>
          </Link>
          <Link href="/detector">
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
              Detector
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
