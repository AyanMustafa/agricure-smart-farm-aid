import { useState } from "react";
import { Calendar, Search, Filter, Eye, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

interface DiagnosisRecord {
  id: string;
  date: string;
  crop: string;
  disease: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical' | 'Healthy';
  confidence: number;
  location: string;
  image?: string;
}

export default function HistoryPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCrop, setFilterCrop] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");

  // Mock data
  const diagnosisHistory: DiagnosisRecord[] = [
    {
      id: '1',
      date: '2024-01-10',
      crop: 'Tomato',
      disease: 'Late Blight',
      severity: 'High',
      confidence: 94,
      location: 'Field A - North',
    },
    {
      id: '2',
      date: '2024-01-09',
      crop: 'Corn',
      disease: 'Healthy',
      severity: 'Healthy',
      confidence: 98,
      location: 'Field B - East',
    },
    {
      id: '3',
      date: '2024-01-08',
      crop: 'Potato',
      disease: 'Early Blight',
      severity: 'Medium',
      confidence: 87,
      location: 'Field C - South',
    },
    {
      id: '4',
      date: '2024-01-07',
      crop: 'Wheat',
      disease: 'Rust',
      severity: 'Low',
      confidence: 76,
      location: 'Field D - West',
    },
    {
      id: '5',
      date: '2024-01-06',
      crop: 'Rice',
      disease: 'Blast',
      severity: 'Critical',
      confidence: 92,
      location: 'Field E - Center',
    }
  ];

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
      case 'healthy':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const filteredHistory = diagnosisHistory.filter(record => {
    const matchesSearch = record.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = !filterCrop || record.crop === filterCrop;
    const matchesSeverity = !filterSeverity || record.severity === filterSeverity;
    
    return matchesSearch && matchesCrop && matchesSeverity;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Diagnosis History</h1>
          <p className="text-muted-foreground mt-1">
            Track and review all your crop disease diagnoses
          </p>
        </div>
        <Button variant="healthy">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by crop, disease, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterCrop} onValueChange={setFilterCrop}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Crops</SelectItem>
                <SelectItem value="Tomato">Tomato</SelectItem>
                <SelectItem value="Corn">Corn</SelectItem>
                <SelectItem value="Potato">Potato</SelectItem>
                <SelectItem value="Wheat">Wheat</SelectItem>
                <SelectItem value="Rice">Rice</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Severities</SelectItem>
                <SelectItem value="Healthy">Healthy</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>
            Diagnosis Records ({filteredHistory.length})
          </CardTitle>
          <CardDescription>
            Detailed history of all crop diagnoses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Disease/Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="text-center">Confidence</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {record.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{record.crop}</span>
                    </TableCell>
                    <TableCell>
                      <span className={record.severity === 'Healthy' ? 'text-success' : ''}>
                        {record.disease}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(record.severity) as any}>
                        {record.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-12 bg-muted rounded-full h-2">
                          <div 
                            className="h-2 bg-primary rounded-full" 
                            style={{ width: `${record.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{record.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{record.location}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}