import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { AlertCircle, Droplet, Home, Zap } from "lucide-react";

/**
 * Info Page - Clinical Precision Design
 * 
 * Educational content about bedbugs with medical accuracy
 * - Clear sections with visual hierarchy
 * - Icon-based organization
 * - Actionable information
 */

export default function Info() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/info-hero.jpg"
            alt="Scientific illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative container py-20 flex flex-col items-start justify-center min-h-[400px]">
          <h1 className="text-5xl font-bold text-white mb-4">About Bedbugs</h1>
          <p className="text-xl text-gray-100 max-w-2xl">
            Comprehensive information to help you understand, identify, and manage bedbug infestations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-20">
        {/* What are Bedbugs */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-foreground mb-6">What Are Bedbugs?</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Bedbugs (Cimex lectularius) are small, parasitic insects that feed on human blood. They are typically found in bedding, mattresses, and furniture, especially in areas where people sleep or rest.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                These insects are oval-shaped, reddish-brown in color, and about the size of an apple seed (4-5mm). They are nocturnal creatures that emerge at night to feed, usually taking 5-10 minutes to consume a blood meal.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Bedbugs can survive for several months without feeding and reproduce rapidly, making infestations difficult to control without professional intervention.
              </p>
            </div>
            <Card className="p-8 bg-primary/5 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Facts</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Size: 4-5mm (apple seed size)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Color: Reddish-brown</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Lifespan: 4-6 months</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Reproduction: 1-5 eggs per day</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Activity: Nocturnal</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Feeding: Every 5-10 days</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Identification */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-foreground mb-6">How to Identify Bedbugs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Physical Appearance</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Flat, oval-shaped body</li>
                <li>• Reddish-brown color (darker after feeding)</li>
                <li>• Six legs with antennae</li>
                <li>• No wings</li>
                <li>• Visible segmentation on abdomen</li>
                <li>• Size similar to an apple seed</li>
              </ul>
            </Card>

            <Card className="p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Droplet className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Signs of Infestation</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Red or dark spots on bedding (fecal matter)</li>
                <li>• Itchy welts or bites on skin</li>
                <li>• Musty odor in bedroom</li>
                <li>• Live bugs in mattress seams</li>
                <li>• Shed exoskeletons</li>
                <li>• Eggs in clusters (cream-colored)</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Prevention */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-foreground mb-6">Prevention Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">At Home</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Inspect mattresses regularly</li>
                <li>• Wash bedding in hot water weekly</li>
                <li>• Vacuum frequently</li>
                <li>• Seal cracks and crevices</li>
                <li>• Reduce clutter in bedrooms</li>
                <li>• Use mattress encasements</li>
              </ul>
            </Card>

            <Card className="p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">When Traveling</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Inspect hotel rooms before unpacking</li>
                <li>• Keep luggage elevated off floors</li>
                <li>• Use luggage protectors</li>
                <li>• Wash clothes in hot water upon return</li>
                <li>• Inspect used furniture before bringing home</li>
                <li>• Avoid placing bags on beds</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Treatment */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-foreground mb-6">Treatment Options</h2>
          <div className="space-y-6">
            <Card className="p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">Professional Pest Control</h3>
              <p className="text-muted-foreground mb-4">
                The most effective approach. Professional exterminators use specialized equipment and treatments including heat treatment, chemical pesticides, and integrated pest management strategies. Multiple treatments may be necessary.
              </p>
              <p className="text-sm text-primary font-medium">Recommended for severe infestations</p>
            </Card>

            <Card className="p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">Heat Treatment</h3>
              <p className="text-muted-foreground mb-4">
                Raising room temperature to 118°F (48°C) for 90 minutes kills all life stages of bedbugs. This method is chemical-free and highly effective but requires professional equipment.
              </p>
              <p className="text-sm text-primary font-medium">Most effective non-chemical method</p>
            </Card>

            <Card className="p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">DIY Methods</h3>
              <p className="text-muted-foreground mb-4">
                Vacuuming, washing in hot water, and using diatomaceous earth can help reduce populations. However, these methods alone are rarely sufficient for complete elimination. Always combine with professional treatment.
              </p>
              <p className="text-sm text-primary font-medium">Supplement to professional treatment</p>
            </Card>
          </div>
        </div>

        {/* Health Effects */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-foreground mb-6">Health Effects</h2>
          <Card className="p-8 border border-border bg-accent/5">
            <p className="text-muted-foreground mb-4 leading-relaxed">
              While bedbugs do not transmit diseases, their bites can cause significant discomfort. Symptoms include itching, red welts, and allergic reactions in some individuals. Scratching bites can lead to secondary skin infections.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Bedbug infestations can also cause psychological distress, sleep disruption, and anxiety. If you suspect an infestation, consult a healthcare provider for bite treatment and a pest control professional for elimination.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-y border-border py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Suspect a Bedbug Problem?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Use our detector to identify suspected bedbugs from images. Upload a clear photo for AI-powered analysis.
          </p>
          <a
            href="/detector"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Try the Detector
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-12 border-t border-border">
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-4">
            This information is for educational purposes. Always consult professionals for pest control and medical advice.
          </p>
          <p>&copy; 2025 Bedbug Detector. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
