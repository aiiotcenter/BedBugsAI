import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Zap, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

/**
 * Home Page - Clinical Precision Design
 * 
 * Design Philosophy:
 * - Medical authority through teal color palette
 * - Clear visual hierarchy with Playfair Display headings
 * - Generous whitespace and breathing room
 * - Trust-building through transparency and clarity
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-main.jpg"
            alt="Laboratory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative container py-24 flex flex-col items-start justify-center min-h-[600px]">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Detect Bedbugs with Confidence
            </h1>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Advanced AI-powered detection system to identify bedbugs quickly and accurately. Upload an image and get instant results with confidence scoring.
            </p>
            <Link href="/detector">
              <Button size="lg" className="bg-primary hover:opacity-90 text-primary-foreground">
                Start Detection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our Detector?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Our system combines advanced machine learning with medical-grade accuracy to help you identify bedbugs with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Instant Results</h3>
            <p className="text-muted-foreground">
              Get predictions in seconds. Our AI model analyzes your image and provides immediate feedback with confidence scoring.
            </p>
          </Card>

          <Card className="p-8 border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">High Accuracy</h3>
            <p className="text-muted-foreground">
              Trained on thousands of verified samples. Our model achieves medical-grade accuracy for reliable detection.
            </p>
          </Card>

          <Card className="p-8 border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Easy to Use</h3>
            <p className="text-muted-foreground">
              Simple upload interface. No technical knowledge required. Works with JPG and PNG images.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-y border-border py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Detect?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload an image of a suspected bedbug to get started. Our AI will analyze it and provide a detailed report.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/detector">
              <Button size="lg" className="bg-primary hover:opacity-90">
                Go to Detector
              </Button>
            </Link>
            <Link href="/info">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-12 border-t border-border">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-foreground mb-4">About</h4>
            <p className="text-sm text-muted-foreground">
              A modern bedbug detection system powered by advanced AI and machine learning technology.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/info">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">About Bedbugs</span>
                </Link>
              </li>
              <li>
                <Link href="/detector">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">Detector</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Disclaimer</h4>
            <p className="text-sm text-muted-foreground">
              This tool is for informational purposes. Always consult a professional for pest control.
            </p>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Bedbug Detector. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
