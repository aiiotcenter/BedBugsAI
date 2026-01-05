import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";

/**
 * Detector Page - Clinical Precision Design
 * 
 * Image upload and prediction interface
 * - Clear upload area
 * - Real-time feedback
 * - Confidence visualization
 * - Result history display
 */

interface PredictionResult {
  label: string;
  probability: number;
  confidence: number;
  image_name?: string;
  created_at?: string;
}

export default function Detector() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleImageSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-primary/10");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-primary/10");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-primary/10");
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setResult(data);

      // Save to history
      const historyItem = {
        ...data,
        image_name: selectedImage.name,
        created_at: new Date().toISOString(),
      };
      setHistory([historyItem, ...history]);

      // Save to backend
      try {
        await fetch(`${API_URL}/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: data.label,
            confidence: data.confidence,
            image_name: selectedImage.name,
          }),
        });
      } catch (err) {
        console.log("Could not save to database:", err);
      }

      toast.success("Prediction completed!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getResultColor = (label: string) => {
    if (label === "Cimex" || label === "culex") return "text-accent";
    if (label === "Non-Cimex" || label === "non-culex") return "text-primary";
    return "text-muted-foreground";
  };

  const getResultIcon = (label: string) => {
    if (label === "uncertain") return <AlertCircle className="w-8 h-8" />;
    return <CheckCircle className="w-8 h-8" />;
  };

  const getConfidencePercentage = (confidence: number) => {
    return Math.round(confidence * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/detector-hero.jpg"
            alt="Detector"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative container py-16 flex flex-col items-start justify-center min-h-[300px]">
          <h1 className="text-5xl font-bold text-white mb-4">Bedbug Detector</h1>
          <p className="text-xl text-gray-100 max-w-2xl">
            Upload an image to analyze. Our AI will identify bedbugs and provide a confidence score.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card className="p-8 border border-border">
              {!imagePreview ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Upload Image
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your image here, or click to select
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: JPG, PNG (Max 5MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleImageSelect(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              ) : (
                <div>
                  <div className="relative mb-6 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-96 object-contain"
                    />
                    <button
                      onClick={handleClear}
                      className="absolute top-4 right-4 p-2 bg-background rounded-full hover:bg-muted transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    File: {selectedImage?.name}
                  </p>
                  <Button
                    onClick={handlePredict}
                    disabled={loading}
                    className="w-full bg-primary hover:opacity-90"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Results Section */}
          <div>
            {result && (
              <Card className="p-8 border border-border sticky top-20">
                <div className="flex items-center justify-center mb-6">
                  <div className={`${getResultColor(result.label)}`}>
                    {getResultIcon(result.label)}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground text-center mb-2">
                  {result.label === "Cimex" || result.label === "culex"
                    ? "Bedbug Detected"
                    : result.label === "uncertain"
                    ? "Uncertain"
                    : "No Bedbug"}
                </h3>

                <div className="mb-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Confidence Score
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {getConfidencePercentage(result.confidence)}%
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Probability
                    </p>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.round(result.probability * 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round(result.probability * 100)}%
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                    Result
                  </p>
                  <p className="text-sm text-foreground">
                    {result.label === "Cimex" || result.label === "culex"
                      ? "This image shows characteristics consistent with bedbugs. Consult a professional for confirmation and treatment."
                      : result.label === "uncertain"
                      ? "The analysis is uncertain. Please provide a clearer image or consult a professional."
                      : "This image does not show bedbugs. However, if you suspect an infestation, consult a professional."}
                  </p>
                </div>

                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="w-full mt-6"
                >
                  Analyze Another Image
                </Button>
              </Card>
            )}

            {!result && (
              <Card className="p-8 border border-border">
                <h3 className="font-bold text-foreground mb-4">Tips</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Use clear, well-lit images</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Focus on the insect</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Avoid blurry photos</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>JPG or PNG format</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Max file size: 5MB</span>
                  </li>
                </ul>
              </Card>
            )}
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Recent Predictions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item, idx) => (
                <Card key={idx} className="p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${getResultColor(item.label)}`}>
                      {getResultIcon(item.label)}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "Just now"}
                    </span>
                  </div>
                  <p className="font-medium text-foreground mb-2">
                    {item.image_name || "Unknown"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.label}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Confidence
                    </span>
                    <span className="font-bold text-primary">
                      {getConfidencePercentage(item.confidence)}%
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="container py-12 border-t border-border mt-20">
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-4">
            This tool is for informational purposes. Always consult professionals for pest control.
          </p>
          <p>&copy; 2025 Bedbug Detector. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
