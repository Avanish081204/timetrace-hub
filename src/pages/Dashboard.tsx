import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, BookOpen, MapPin, TrendingUp, Clock, CheckCircle, AlertTriangle, Zap } from "lucide-react";

const stats = [
  {
    title: "Active Courses",
    value: "156",
    change: "+12%",
    icon: BookOpen,
    color: "text-primary",
  },
  {
    title: "Faculty Members",
    value: "89",
    change: "+3%",
    icon: Users,
    color: "text-success",
  },
  {
    title: "Classrooms",
    value: "45",
    change: "0%",
    icon: MapPin,
    color: "text-warning",
  },
  {
    title: "Utilization Rate",
    value: "87%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-primary",
  },
];

const recentActivities = [
  { action: "Timetable generated", details: "Spring 2024 - Computer Science", time: "2 hours ago", status: "success" },
  { action: "Faculty updated", details: "Dr. Sarah Johnson - Availability changed", time: "4 hours ago", status: "info" },
  { action: "Classroom conflict detected", details: "Room 101A - Wednesday 2:00 PM", time: "6 hours ago", status: "warning" },
  { action: "Course added", details: "Advanced Algorithms - CS 401", time: "1 day ago", status: "success" },
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-card shadow-soft">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                  <p className="text-sm text-muted-foreground">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {currentTime.toLocaleTimeString()}
                </Badge>
                <Button className="bg-gradient-primary hover:shadow-medium transition-all duration-300">
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Timetable
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                          <p className={`text-sm font-medium ${
                            stat.change.startsWith('+') ? 'text-success' : 
                            stat.change.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'
                          }`}>
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className={`p-3 rounded-full bg-primary/10`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* System Status */}
                <Card className="lg:col-span-2 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>System Performance</span>
                    </CardTitle>
                    <CardDescription>Current system health and utilization metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Classroom Utilization</span>
                        <span className="text-sm text-muted-foreground">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Faculty Workload Balance</span>
                        <span className="text-sm text-muted-foreground">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Schedule Optimization</span>
                        <span className="text-sm text-muted-foreground">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>

                    <div className="pt-4 border-t">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-success">0</p>
                          <p className="text-xs text-muted-foreground">Active Conflicts</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-primary">156</p>
                          <p className="text-xs text-muted-foreground">Scheduled Classes</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-warning">3</p>
                          <p className="text-xs text-muted-foreground">Pending Reviews</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                    <CardDescription>Latest system updates and changes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/50">
                          <div className={`p-1 rounded-full ${
                            activity.status === 'success' ? 'bg-success/20' :
                            activity.status === 'warning' ? 'bg-warning/20' : 'bg-primary/20'
                          }`}>
                            {activity.status === 'success' ? (
                              <CheckCircle className="h-3 w-3 text-success" />
                            ) : activity.status === 'warning' ? (
                              <AlertTriangle className="h-3 w-3 text-warning" />
                            ) : (
                              <Clock className="h-3 w-3 text-primary" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.details}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 hover:shadow-medium transition-all duration-300">
                      <BookOpen className="h-6 w-6" />
                      <span className="text-sm">Add Course</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 hover:shadow-medium transition-all duration-300">
                      <Users className="h-6 w-6" />
                      <span className="text-sm">Manage Faculty</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 hover:shadow-medium transition-all duration-300">
                      <MapPin className="h-6 w-6" />
                      <span className="text-sm">Room Setup</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2 hover:shadow-medium transition-all duration-300">
                      <Calendar className="h-6 w-6" />
                      <span className="text-sm">View Schedule</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}