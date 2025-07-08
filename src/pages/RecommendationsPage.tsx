import { useState } from "react";
import { Lightbulb, AlertTriangle, CheckCircle, Clock, MapPin, Thermometer, Droplets } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

interface Recommendation {
  id: string;
  type: 'preventive' | 'treatment' | 'monitoring' | 'urgent';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  crop: string;
  timeframe: string;
  effort: 'easy' | 'moderate' | 'complex';
  cost: 'low' | 'medium' | 'high';
  effectivenesss: number;
}

export default function RecommendationsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  // Mock recommendations data
  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'Apply Fungicide Treatment for Late Blight',
      description: 'Immediate application of copper-based fungicide needed for tomato plants showing late blight symptoms. Apply every 7-10 days until conditions improve.',
      priority: 'critical',
      crop: 'Tomato',
      timeframe: 'Immediate',
      effort: 'moderate',
      cost: 'medium',
      effectivenesss: 92
    },
    {
      id: '2',
      type: 'preventive',
      title: 'Increase Air Circulation in Greenhouse',
      description: 'Install additional fans or ventilation systems to reduce humidity and prevent fungal diseases in enclosed growing areas.',
      priority: 'medium',
      crop: 'All crops',
      timeframe: 'Within 1 week',
      effort: 'complex',
      cost: 'high',
      effectivenesss: 85
    },
    {
      id: '3',
      type: 'monitoring',
      title: 'Weekly Inspection for Early Disease Detection',
      description: 'Conduct systematic weekly inspections of all crops, focusing on leaf undersides and stem bases where diseases typically start.',
      priority: 'medium',
      crop: 'All crops',
      timeframe: 'Ongoing',
      effort: 'easy',
      cost: 'low',
      effectivenesss: 78
    },
    {
      id: '4',
      type: 'treatment',
      title: 'Adjust Irrigation Schedule',
      description: 'Reduce overhead watering and switch to drip irrigation to minimize leaf wetness and reduce fungal disease risk.',
      priority: 'high',
      crop: 'Potato, Tomato',
      timeframe: 'Within 3 days',
      effort: 'moderate',
      cost: 'medium',
      effectivenesss: 88
    },
    {
      id: '5',
      type: 'preventive',
      title: 'Apply Preventive Spraying Program',
      description: 'Implement a preventive spraying schedule using organic fungicides before disease symptoms appear.',
      priority: 'medium',
      crop: 'Tomato, Potato',
      timeframe: 'Next week',
      effort: 'easy',
      cost: 'low',
      effectivenesss: 75
    }
  ];

  const weatherAlert = {
    condition: 'High Humidity + Warm Temperature',
    risk: 'Increased fungal disease risk',
    recommendation: 'Consider preventive fungicide application within 24-48 hours'
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'treatment':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'monitoring':
        return <Clock className="h-4 w-4 text-info" />;
      case 'preventive':
        return <Lightbulb className="h-4 w-4 text-warning" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const filteredRecommendations = recommendations.filter(rec => {
    if (activeTab === 'all') return true;
    return rec.type === activeTab;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Smart Recommendations</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered recommendations based on your diagnoses and environmental conditions
        </p>
      </div>

      {/* Weather Alert */}
      <Alert className="border-warning/50 bg-warning/10">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-warning mb-1">Weather Alert</h4>
            <AlertDescription className="text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Thermometer className="h-3 w-3" />
                    <span>28°C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    <span>78% humidity</span>
                  </div>
                </div>
                <p><strong>{weatherAlert.condition}:</strong> {weatherAlert.risk}</p>
                <p className="text-warning font-medium">{weatherAlert.recommendation}</p>
              </div>
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="treatment">Treatment</TabsTrigger>
          <TabsTrigger value="preventive">Preventive</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.id} className="transition-all hover:shadow-medium">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getTypeIcon(rec.type)}
                    <div className="flex-1">
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {rec.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={getPriorityColor(rec.priority) as any}>
                    {rec.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <MapPin className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">Crop</div>
                    <div className="text-sm font-medium">{rec.crop}</div>
                  </div>
                  
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">Timeframe</div>
                    <div className="text-sm font-medium">{rec.timeframe}</div>
                  </div>
                  
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">Effort</div>
                    <div className="text-sm font-medium capitalize">{rec.effort}</div>
                  </div>
                  
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">Cost</div>
                    <div className="text-sm font-medium capitalize">{rec.cost}</div>
                  </div>
                  
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">Effectiveness</div>
                    <div className="text-sm font-medium text-success">{rec.effectivenesss}%</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="healthy" size="sm">
                    Mark as Completed
                  </Button>
                  <Button variant="outline" size="sm">
                    Get More Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Remind Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {filteredRecommendations.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recommendations available</h3>
            <p className="text-muted-foreground">
              {activeTab === 'all' 
                ? "No recommendations found. Upload more crop images to get personalized advice."
                : `No ${activeTab} recommendations at this time.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}