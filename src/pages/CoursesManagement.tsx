import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Plus, Search, Edit, Trash2, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockCourses = [
  {
    id: 1,
    code: "CS401",
    name: "Advanced Algorithms",
    credits: 3,
    type: "Lecture",
    department: "Computer Science",
    sessionsPerWeek: 3,
    duration: 60,
    faculty: "Dr. Sarah Johnson",
    students: 45,
  },
  {
    id: 2,
    code: "CS402L",
    name: "Database Systems Lab",
    credits: 1,
    type: "Lab",
    department: "Computer Science",
    sessionsPerWeek: 1,
    duration: 180,
    faculty: "Prof. Michael Chen",
    students: 30,
  },
  {
    id: 3,
    code: "MATH301",
    name: "Linear Algebra",
    credits: 4,
    type: "Lecture",
    department: "Mathematics",
    sessionsPerWeek: 4,
    duration: 50,
    faculty: "Dr. Emily Rodriguez",
    students: 60,
  },
  {
    id: 4,
    code: "PHY201",
    name: "Quantum Physics",
    credits: 3,
    type: "Mixed",
    department: "Physics",
    sessionsPerWeek: 2,
    duration: 75,
    faculty: "Dr. Robert Kim",
    students: 35,
  },
];

export default function CoursesManagement() {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || course.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(courses.map(course => course.department)));

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lecture": return "bg-primary/10 text-primary";
      case "Lab": return "bg-success/10 text-success";
      case "Mixed": return "bg-warning/10 text-warning";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const handleAddCourse = () => {
    toast({
      title: "Course Added",
      description: "New course has been successfully added to the system.",
    });
    setIsAddDialogOpen(false);
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
                  <h1 className="text-2xl font-bold text-foreground">Courses Management</h1>
                  <p className="text-sm text-muted-foreground">Manage course catalog and scheduling requirements</p>
                </div>
              </div>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:shadow-medium transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Add New Course</span>
                    </DialogTitle>
                    <DialogDescription>
                      Enter the course details and scheduling requirements
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="code">Course Code</Label>
                      <Input id="code" placeholder="e.g., CS401" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Course Name</Label>
                      <Input id="name" placeholder="e.g., Advanced Algorithms" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="credits">Credits</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select credits" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Credit</SelectItem>
                          <SelectItem value="2">2 Credits</SelectItem>
                          <SelectItem value="3">3 Credits</SelectItem>
                          <SelectItem value="4">4 Credits</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Course Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lecture">Lecture</SelectItem>
                          <SelectItem value="lab">Lab</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessions">Sessions per Week</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sessions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Session</SelectItem>
                          <SelectItem value="2">2 Sessions</SelectItem>
                          <SelectItem value="3">3 Sessions</SelectItem>
                          <SelectItem value="4">4 Sessions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Session Duration (minutes)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="75">75 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="180">180 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="faculty">Assigned Faculty</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select faculty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="johnson">Dr. Sarah Johnson</SelectItem>
                          <SelectItem value="chen">Prof. Michael Chen</SelectItem>
                          <SelectItem value="rodriguez">Dr. Emily Rodriguez</SelectItem>
                          <SelectItem value="kim">Dr. Robert Kim</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCourse} className="bg-gradient-primary">
                      Add Course
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Filters and Search */}
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search courses, codes, or faculty..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-64">
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Courses Table */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Course Catalog</span>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {filteredCourses.length} courses
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Manage course information, scheduling requirements, and faculty assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Schedule</TableHead>
                          <TableHead>Faculty</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCourses.map((course) => (
                          <TableRow key={course.id} className="hover:bg-secondary/50">
                            <TableCell>
                              <div>
                                <div className="font-medium text-foreground">{course.code}</div>
                                <div className="text-sm text-muted-foreground">{course.name}</div>
                                <div className="text-xs text-muted-foreground">{course.department}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getTypeColor(course.type)}>
                                {course.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center font-medium">
                              {course.credits}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{course.sessionsPerWeek}x/week</span>
                                </div>
                                <div className="text-muted-foreground">
                                  {course.duration}min
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm font-medium">{course.faculty}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span className="text-sm">{course.students}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}