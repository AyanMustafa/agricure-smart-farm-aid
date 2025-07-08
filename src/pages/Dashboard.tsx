import { Camera, TrendingUp, AlertTriangle, CheckCircle, Activity, Thermometer, Droplets, Wind } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Mock data for demonstration
  const recentDiagnoses = [
    {
      id: '1',
      crop: 'Tomato',
      disease: 'Late Blight',
      severity: 'High',
      date: '2024-01-10',
      confidence: 94
    },
    {
      id: '2',
      crop: 'Corn',
      disease: 'Healthy',
      severity: 'None',
      date: '2024-01-09',
      confidence: 98
    },
    {
      id: '3',
      crop: 'Potato',
      disease: 'Early Blight',
      severity: 'Medium',
      date: '2024-01-08',
      confidence: 87
    }
  ];

  const weatherData = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    riskLevel: 'Medium'
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'success';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-healthy rounded-xl p-6 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-primary-foreground/90 mb-4">
          Monitor your crops and get AI-powered disease diagnosis to protect your harvest.
        </p>
        <Link to="/diagnose">
          <Button variant="secondary" size="lg" className="bg-white/20 hover:bg-white/30 border-white/30">
            <Camera className="w-5 h-5 mr-2" />
            {t('diagnose')} Crop
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-success/20 bg-success/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Diagnoses</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">156</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diseases Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">23</div>
            <p className="text-xs text-muted-foreground">
              Early detection rate: 89%
            </p>
          </CardContent>
        </Card>

        <Card className="border-info/20 bg-info/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Crops</CardTitle>
            <CheckCircle className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">133</div>
            <p className="text-xs text-muted-foreground">
              85% of total diagnoses
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">94%</div>
            <p className="text-xs text-muted-foreground">
              AI model confidence
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Diagnoses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Diagnoses</CardTitle>
            <CardDescription>
              Your latest crop health assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDiagnoses.map((diagnosis) => (
                <div key={diagnosis.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{diagnosis.crop}</span>
                      <Badge variant={getSeverityColor(diagnosis.severity) as any}>
                        {diagnosis.disease}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{diagnosis.date}</span>
                      <span>Confidence: {diagnosis.confidence}%</span>
                    </div>
                  </div>
                  <Progress 
                    value={diagnosis.confidence} 
                    className="w-16 h-2"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/history">
                <Button variant="outline" className="w-full">
                  View All History
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Weather & Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Conditions</CardTitle>
            <CardDescription>
              Current weather and disease risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Thermometer className="h-6 w-6 mx-auto mb-2 text-destructive" />
                  <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                  <div className="text-sm text-muted-foreground">Temperature</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Droplets className="h-6 w-6 mx-auto mb-2 text-info" />
                  <div className="text-2xl font-bold">{weatherData.humidity}%</div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Wind className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{weatherData.windSpeed}</div>
                  <div className="text-sm text-muted-foreground">km/h Wind</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <span className="font-semibold text-warning">Disease Risk: {weatherData.riskLevel}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Current conditions favor fungal diseases. Consider preventive measures for tomatoes and potatoes.
                </p>
              </div>

              <Link to="/recommendations">
                <Button variant="outline" className="w-full">
                  View Recommendations
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}