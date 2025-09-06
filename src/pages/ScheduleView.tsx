import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, Filter, Clock, MapPin, Users, BookOpen, Share2 } from "lucide-react";

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const mockScheduleData = {
  "Monday": {
    "09:00": { course: "CS401", room: "Room 101", faculty: "Dr. Johnson", students: 45, type: "Lecture" },
    "11:00": { course: "MATH301", room: "Room 203", faculty: "Dr. Rodriguez", students: 60, type: "Lecture" },
    "14:00": { course: "PHY201", room: "Lab 305", faculty: "Dr. Kim", students: 35, type: "Lab" },
  },
  "Tuesday": {
    "10:00": { course: "CS402L", room: "Lab 101", faculty: "Prof. Chen", students: 30, type: "Lab" },
    "13:00": { course: "CS401", room: "Room 102", faculty: "Dr. Johnson", students: 45, type: "Lecture" },
    "15:00": { course: "MATH301", room: "Room 203", faculty: "Dr. Rodriguez", students: 60, type: "Tutorial" },
  },
  "Wednesday": {
    "09:00": { course: "PHY201", room: "Room 301", faculty: "Dr. Kim", students: 35, type: "Lecture" },
    "11:00": { course: "CS401", room: "Room 101", faculty: "Dr. Johnson", students: 45, type: "Lecture" },
    "16:00": { course: "MATH301", room: "Room 204", faculty: "Dr. Rodriguez", students: 60, type: "Problem Solving" },
  },
  "Thursday": {
    "08:00": { course: "CS402L", room: "Lab 101", faculty: "Prof. Chen", students: 30, type: "Lab" },
    "12:00": { course: "PHY201", room: "Lab 305", faculty: "Dr. Kim", students: 35, type: "Lab" },
    "14:00": { course: "MATH301", room: "Room 203", faculty: "Dr. Rodriguez", students: 60, type: "Lecture" },
  },
  "Friday": {
    "10:00": { course: "CS401", room: "Room 101", faculty: "Dr. Johnson", students: 45, type: "Review" },
    "13:00": { course: "PHY201", room: "Room 301", faculty: "Dr. Kim", students: 35, type: "Lecture" },
    "15:00": { course: "CS402L", room: "Lab 102", faculty: "Prof. Chen", students: 30, type: "Project" },
  },
};

const getCourseColor = (course: string) => {
  const colors = {
    "CS401": "bg-blue-100 text-blue-800 border-blue-200",
    "CS402L": "bg-green-100 text-green-800 border-green-200", 
    "MATH301": "bg-purple-100 text-purple-800 border-purple-200",
    "PHY201": "bg-orange-100 text-orange-800 border-orange-200",
  };
  return colors[course as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Lecture": return <BookOpen className="h-3 w-3" />;
    case "Lab": return <MapPin className="h-3 w-3" />;
    case "Tutorial": return <Users className="h-3 w-3" />;
    default: return <Clock className="h-3 w-3" />;
  }
};

export default function ScheduleView() {
  const [selectedView, setSelectedView] = useState("week");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState("all");

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
                  <h1 className="text-2xl font-bold text-foreground">Schedule View</h1>
                  <p className="text-sm text-muted-foreground">Interactive timetable calendar with drag-drop editing</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Badge variant="outline" className="text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Spring 2024
                </Badge>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Filters */}
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Filters:</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="All Rooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Rooms</SelectItem>
                          <SelectItem value="101">Room 101</SelectItem>
                          <SelectItem value="102">Room 102</SelectItem>
                          <SelectItem value="lab101">Lab 101</SelectItem>
                          <SelectItem value="lab102">Lab 102</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select value={selectedView} onValueChange={setSelectedView}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Week View</SelectItem>
                          <SelectItem value="day">Day View</SelectItem>
                          <SelectItem value="room">Room View</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Schedule */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Weekly Timetable</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Drag & Drop to Edit</span>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Interactive schedule with real-time conflict detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-6 gap-2 min-w-[800px]">
                      {/* Header Row */}
                      <div className="p-3 text-center font-medium text-muted-foreground">Time</div>
                      {days.map(day => (
                        <div key={day} className="p-3 text-center font-medium text-foreground">
                          {day}
                        </div>
                      ))}
                      
                      {/* Time Slots */}
                      {timeSlots.map(time => (
                        <React.Fragment key={time}>
                          <div className="p-3 text-center text-sm text-muted-foreground border-r">
                            {time}
                          </div>
                          {days.map(day => {
                            const session = (mockScheduleData as any)[day]?.[time];
                            return (
                              <div key={`${day}-${time}`} className="p-2 min-h-[80px] border border-border/50 rounded-lg hover:bg-secondary/30 transition-colors">
                                {session && (
                                  <div className={`p-3 rounded-lg border-2 ${getCourseColor(session.course)} cursor-move hover:shadow-medium transition-all duration-200`}>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-semibold text-sm">{session.course}</span>
                                      {getTypeIcon(session.type)}
                                    </div>
                                    <div className="text-xs space-y-1">
                                      <div className="flex items-center space-x-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>{session.room}</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Users className="h-3 w-3" />
                                        <span>{session.students} students</span>
                                      </div>
                                      <div className="font-medium">
                                        {session.faculty}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Views */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Room Utilization */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Room Utilization</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { room: "Room 101", utilization: 87, sessions: 12 },
                        { room: "Room 102", utilization: 72, sessions: 8 },
                        { room: "Lab 101", utilization: 94, sessions: 15 },
                        { room: "Lab 102", utilization: 68, sessions: 7 },
                        { room: "Room 203", utilization: 91, sessions: 14 },
                      ].map(room => (
                        <div key={room.room} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <div className="font-medium">{room.room}</div>
                            <div className="text-sm text-muted-foreground">{room.sessions} sessions/week</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${
                              room.utilization >= 90 ? 'text-success' :
                              room.utilization >= 75 ? 'text-warning' : 'text-muted-foreground'
                            }`}>
                              {room.utilization}%
                            </div>
                            <div className="text-xs text-muted-foreground">utilized</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Faculty Workload */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Faculty Workload</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { faculty: "Dr. Johnson", hours: 18, load: 90, courses: 2 },
                        { faculty: "Prof. Chen", hours: 15, load: 75, courses: 1 },
                        { faculty: "Dr. Rodriguez", hours: 20, load: 100, courses: 1 },
                        { faculty: "Dr. Kim", hours: 16, load: 80, courses: 1 },
                      ].map(person => (
                        <div key={person.faculty} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <div className="font-medium">{person.faculty}</div>
                            <div className="text-sm text-muted-foreground">{person.courses} courses</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${
                              person.load === 100 ? 'text-success' :
                              person.load >= 80 ? 'text-warning' : 'text-muted-foreground'
                            }`}>
                              {person.hours}h
                            </div>
                            <div className="text-xs text-muted-foreground">{person.load}% load</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Add React import for Fragment
import React from 'react';