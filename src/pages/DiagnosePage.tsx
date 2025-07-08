import { useState, useRef } from "react";
import { Camera, Upload, X, Loader2, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";

interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  affectedArea: string;
  recommendations: string[];
  isHealthy: boolean;
}

export default function DiagnosePage() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setDiagnosisResult(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock diagnosis results
    const mockResults: DiagnosisResult[] = [
      {
        disease: "Late Blight",
        confidence: 94,
        severity: "High",
        affectedArea: "Leaves and stems",
        recommendations: [
          "Apply copper-based fungicide immediately",
          "Remove affected plant parts",
          "Improve air circulation",
          "Avoid overhead watering"
        ],
        isHealthy: false
      },
      {
        disease: "Healthy Plant",
        confidence: 98,
        severity: "Low",
        affectedArea: "None",
        recommendations: [
          "Continue current care routine",
          "Monitor for early signs of disease",
          "Maintain proper spacing between plants"
        ],
        isHealthy: true
      }
    ];
    
    // Randomly select a result for demo
    const result = mockResults[Math.random() > 0.3 ? 0 : 1];
    setDiagnosisResult(result);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDiagnosisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'success';
    }
  };

  const getSeverityIcon = (severity: string, isHealthy: boolean) => {
    if (isHealthy) return <CheckCircle className="h-5 w-5 text-success" />;
    
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      default:
        return <Info className="h-5 w-5 text-info" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Crop Disease Diagnosis</h1>
        <p className="text-muted-foreground">
          Upload or take a photo of your crop to get instant AI-powered disease analysis
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            {t('upload_image')}
          </CardTitle>
          <CardDescription>
            Take a clear photo of the affected plant or upload an existing image
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!imagePreview ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium mb-2">Upload crop image</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop or click to select from your device
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      {t('take_photo')}
                    </Button>
                  </div>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Crop preview"
                  className="w-full max-w-md mx-auto rounded-lg shadow-medium"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleReset}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-center gap-2">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  variant="healthy"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t('analyzing')}
                    </>
                  ) : (
                    'Analyze Crop'
                  )}
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Upload New Image
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">{t('analyzing')}</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI is analyzing your crop image for diseases and health conditions...
                </p>
              </div>
              <Progress value={75} className="w-64 mx-auto" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diagnosis Results */}
      {diagnosisResult && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getSeverityIcon(diagnosisResult.severity, diagnosisResult.isHealthy)}
              {t('analysis_complete')}
            </CardTitle>
            <CardDescription>
              AI-powered diagnosis with {diagnosisResult.confidence}% confidence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Result */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold mb-1 text-foreground">
                  {diagnosisResult.disease}
                </div>
                <div className="text-sm text-muted-foreground">
                  {diagnosisResult.isHealthy ? 'Status' : 'Disease'}
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold mb-1">
                  <Badge variant={getSeverityColor(diagnosisResult.severity) as any}>
                    {diagnosisResult.severity}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {t('severity')}
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold mb-1 text-foreground">
                  {diagnosisResult.confidence}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {t('confidence')}
                </div>
              </div>
            </div>

            {/* Affected Area */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>{t('affected_area')}:</strong> {diagnosisResult.affectedArea}
              </AlertDescription>
            </Alert>

            {/* Recommendations */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Recommended Actions
              </h4>
              <div className="grid gap-2">
                {diagnosisResult.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20"
                  >
                    <div className="w-6 h-6 rounded-full bg-success text-success-foreground text-sm flex items-center justify-center mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                Save to History
              </Button>
              <Button variant="outline" className="flex-1">
                Share Results
              </Button>
              <Button variant="healthy" className="flex-1">
                Get More Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}