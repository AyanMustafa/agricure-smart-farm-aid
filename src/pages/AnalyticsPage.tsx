import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AnalyticsPage() {
  const { t } = useLanguage();

  // Mock data for analytics
  const trendData = [
    { month: 'Jan', diagnoses: 45, diseases: 12 },
    { month: 'Feb', diagnoses: 52, diseases: 8 },
    { month: 'Mar', diagnoses: 38, diseases: 15 },
    { month: 'Apr', diagnoses: 61, diseases: 9 },
    { month: 'May', diagnoses: 48, diseases: 11 },
    { month: 'Jun', diagnoses: 55, diseases: 7 }
  ];

  const diseaseFrequency = [
    { disease: 'Late Blight', count: 23, percentage: 28.4, trend: 'up' },
    { disease: 'Early Blight', count: 18, percentage: 22.2, trend: 'down' },
    { disease: 'Powdery Mildew', count: 15, percentage: 18.5, trend: 'up' },
    { disease: 'Rust', count: 12, percentage: 14.8, trend: 'stable' },
    { disease: 'Bacterial Spot', count: 8, percentage: 9.9, trend: 'down' },
    { disease: 'Others', count: 5, percentage: 6.2, trend: 'stable' }
  ];

  const cropHealth = [
    { crop: 'Tomato', healthy: 75, diseased: 25, total: 156 },
    { crop: 'Potato', healthy: 82, diseased: 18, total: 134 },
    { crop: 'Corn', healthy: 91, diseased: 9, total: 98 },
    { crop: 'Wheat', healthy: 88, diseased: 12, total: 76 },
    { crop: 'Rice', healthy: 79, diseased: 21, total: 45 }
  ];

  const regionalData = [
    { region: 'North Field', diagnoses: 89, diseaseRate: 22, avgConfidence: 94 },
    { region: 'South Field', diagnoses: 67, diseaseRate: 18, avgConfidence: 91 },
    { region: 'East Field', diagnoses: 54, diseaseRate: 31, avgConfidence: 87 },
    { region: 'West Field', diagnoses: 43, diseaseRate: 15, avgConfidence: 96 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-destructive" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-success" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive insights into crop health trends and disease patterns
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-success/20 bg-success/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Health Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">84.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disease Detection Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">15.8%</div>
            <p className="text-xs text-muted-foreground">
              -1.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-info/20 bg-info/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <PieChart className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">92.5%</div>
            <p className="text-xs text-muted-foreground">
              AI model accuracy
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Diagnoses</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-xs text-muted-foreground">
              Last 6 months
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disease Frequency */}
        <Card>
          <CardHeader>
            <CardTitle>Disease Frequency Analysis</CardTitle>
            <CardDescription>
              Most common diseases detected in your crops
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {diseaseFrequency.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.disease}</span>
                      {getTrendIcon(item.trend)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{item.count} cases</span>
                      <Badge variant="outline">{item.percentage}%</Badge>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crop Health Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Crop Health by Type</CardTitle>
            <CardDescription>
              Health status breakdown for different crops
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {cropHealth.map((crop, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{crop.crop}</span>
                    <span className="text-sm text-muted-foreground">
                      {crop.total} diagnoses
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div 
                      className="h-3 bg-success rounded-l-md"
                      style={{ width: `${crop.healthy}%` }}
                      title={`${crop.healthy}% healthy`}
                    />
                    <div 
                      className="h-3 bg-destructive rounded-r-md"
                      style={{ width: `${crop.diseased}%` }}
                      title={`${crop.diseased}% diseased`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{crop.healthy}% Healthy</span>
                    <span>{crop.diseased}% Diseased</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Analysis
          </CardTitle>
          <CardDescription>
            Performance metrics by field location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {regionalData.map((region, index) => (
              <div key={index} className="p-4 rounded-lg border bg-muted/20">
                <h4 className="font-semibold mb-3">{region.region}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Diagnoses</span>
                    <span className="font-medium">{region.diagnoses}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Disease Rate</span>
                    <span className={`font-medium ${region.diseaseRate > 25 ? 'text-destructive' : 'text-success'}`}>
                      {region.diseaseRate}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg Confidence</span>
                    <span className="font-medium text-primary">{region.avgConfidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}