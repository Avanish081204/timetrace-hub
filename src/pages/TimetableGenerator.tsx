import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Zap, Settings, Play, CheckCircle, AlertTriangle, Clock, TrendingUp, Users, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockGenerationResults = [
  {
    id: 1,
    name: "Optimized Schedule A",
    score: 92,
    conflicts: 0,
    utilization: 87,
    workloadBalance: 94,
    status: "completed",
    generatedAt: "2024-01-15 10:30 AM",
  },
  {
    id: 2,
    name: "Balanced Schedule B", 
    score: 89,
    conflicts: 2,
    utilization: 91,
    workloadBalance: 88,
    status: "completed",
    generatedAt: "2024-01-15 10:30 AM",
  },
  {
    id: 3,
    name: "Compact Schedule C",
    score: 85,
    conflicts: 1,
    utilization: 95,
    workloadBalance: 82,
    status: "completed", 
    generatedAt: "2024-01-15 10:30 AM",
  },
];

export default function TimetableGenerator() {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [results, setResults] = useState(mockGenerationResults);
  const [hasResults, setHasResults] = useState(true);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!selectedSemester || !selectedDepartment) {
      toast({
        title: "Missing Information", 
        description: "Please select both semester and department to generate timetable.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setHasResults(false);

    // Simulate generation process
    const steps = [
      { progress: 20, message: "Analyzing course requirements..." },
      { progress: 40, message: "Optimizing room allocations..." },
      { progress: 60, message: "Balancing faculty workloads..." },
      { progress: 80, message: "Resolving conflicts..." },
      { progress: 100, message: "Finalizing schedules..." },
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGenerationProgress(step.progress);
      
      toast({
        title: "Generation Progress",
        description: step.message,
      });
    }

    setIsGenerating(false);
    setHasResults(true);
    
    toast({
      title: "Generation Complete!",
      description: "3 optimized timetable options have been generated successfully.",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-destructive";
  };

  const getConflictColor = (conflicts: number) => {
    if (conflicts === 0) return "text-success";
    if (conflicts <= 2) return "text-warning";
    return "text-destructive";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-card shadow-soft">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Timetable Generator</h1>
                  <p className="text-sm text-muted-foreground">AI-powered optimization engine for intelligent scheduling</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="text-sm">
                  <Zap className="h-4 w-4 mr-1" />
                  OR-Tools Optimization
                </Badge>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Generation Parameters */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Generation Parameters</span>
                  </CardTitle>
                  <CardDescription>
                    Configure the parameters for timetable optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Academic Semester</label>
                      <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spring-2024">Spring 2024</SelectItem>
                          <SelectItem value="fall-2024">Fall 2024</SelectItem>
                          <SelectItem value="summer-2024">Summer 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Optimization Goal</label>
                      <Select defaultValue="balanced">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="balanced">Balanced Optimization</SelectItem>
                          <SelectItem value="utilization">Maximize Room Utilization</SelectItem>
                          <SelectItem value="workload">Balance Faculty Workload</SelectItem>
                          <SelectItem value="compact">Compact Schedules</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Generation Status</h4>
                      <p className="text-sm text-muted-foreground">
                        {isGenerating ? "Generating optimized timetables..." : "Ready to generate timetables"}
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="bg-gradient-primary hover:shadow-medium transition-all duration-300"
                    >
                      {isGenerating ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Generate Timetables
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Generation Progress</span>
                        <span>{generationProgress}%</span>
                      </div>
                      <Progress value={generationProgress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Results Section */}
              {hasResults && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span>Generated Timetables</span>
                    </CardTitle>
                    <CardDescription>
                      Choose from multiple optimized scheduling options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {results.map((result, index) => (
                        <Card key={result.id} className="border-2 hover:border-primary/50 transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-foreground">{result.name}</h3>
                                <p className="text-sm text-muted-foreground">Generated at {result.generatedAt}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className={`${getScoreColor(result.score)} font-semibold`}>
                                  Score: {result.score}%
                                </Badge>
                                <Button variant="outline" size="sm">Preview</Button>
                                <Button size="sm" className="bg-gradient-primary">
                                  Select & Deploy
                                </Button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                                <div className="flex items-center justify-center mb-2">
                                  <AlertTriangle className={`h-5 w-5 ${getConflictColor(result.conflicts)}`} />
                                </div>
                                <div className={`text-2xl font-bold ${getConflictColor(result.conflicts)}`}>
                                  {result.conflicts}
                                </div>
                                <div className="text-xs text-muted-foreground">Conflicts</div>
                              </div>
                              
                              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                                <div className="flex items-center justify-center mb-2">
                                  <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-2xl font-bold text-primary">{result.utilization}%</div>
                                <div className="text-xs text-muted-foreground">Room Utilization</div>
                              </div>
                              
                              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                                <div className="flex items-center justify-center mb-2">
                                  <Users className="h-5 w-5 text-success" />
                                </div>
                                <div className="text-2xl font-bold text-success">{result.workloadBalance}%</div>
                                <div className="text-xs text-muted-foreground">Workload Balance</div>
                              </div>
                              
                              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                                <div className="flex items-center justify-center mb-2">
                                  <TrendingUp className="h-5 w-5 text-warning" />
                                </div>
                                <div className="text-2xl font-bold text-warning">{result.score}%</div>
                                <div className="text-xs text-muted-foreground">Overall Score</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Optimization Insights */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Optimization Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="constraints" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="constraints">Constraints</TabsTrigger>
                      <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                      <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="constraints" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-medium">Hard Constraints</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-success" />
                              <span>No faculty double-booking</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-success" />
                              <span>Room capacity constraints</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-success" />
                              <span>Equipment requirements</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium">Soft Constraints</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center space-x-2">
                              <TrendingUp className="h-4 w-4 text-warning" />
                              <span>Faculty preferred time slots</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <TrendingUp className="h-4 w-4 text-warning" />
                              <span>Minimize travel between buildings</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <TrendingUp className="h-4 w-4 text-warning" />
                              <span>Balanced daily schedules</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="metrics" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-primary">89%</div>
                            <div className="text-sm text-muted-foreground">Average Room Utilization</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-success">91%</div>
                            <div className="text-sm text-muted-foreground">Faculty Satisfaction</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-warning">156</div>
                            <div className="text-sm text-muted-foreground">Total Classes Scheduled</div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="recommendations" className="space-y-4">
                      <div className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <h5 className="font-medium text-primary mb-2">Improve Room Utilization</h5>
                          <p className="text-sm text-muted-foreground">
                            Consider adding more sessions during low-utilization periods (1-3 PM) to better utilize available classroom space.
                          </p>
                        </div>
                        <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                          <h5 className="font-medium text-success mb-2">Faculty Workload Optimization</h5>
                          <p className="text-sm text-muted-foreground">
                            Current schedule achieves excellent workload balance. Dr. Johnson has optimal teaching distribution.
                          </p>
                        </div>
                        <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                          <h5 className="font-medium text-warning mb-2">Schedule Compactness</h5>
                          <p className="text-sm text-muted-foreground">
                            Some students have long gaps between classes. Consider adjusting CS401 and MATH301 timing for better flow.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}