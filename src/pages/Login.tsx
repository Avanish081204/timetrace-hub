import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Users, UserCheck, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const roles = [
  { value: "admin", label: "Admin", icon: UserCheck, description: "Full system access and configuration" },
  { value: "department-head", label: "Department Head", icon: Users, description: "Manage department faculty and courses" },
  { value: "faculty", label: "Faculty", icon: GraduationCap, description: "View schedules and update availability" },
  { value: "student", label: "Student/Viewer", icon: Eye, description: "View published timetables" },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select your role to continue",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate login success
    toast({
      title: "Login Successful",
      description: `Welcome back! Redirecting to ${selectedRole} dashboard...`,
    });
    
    // In real app, this would redirect based on role
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">University Timetable System</h1>
          <p className="text-white/80 text-lg">Intelligent scheduling and resource management</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Role Selection */}
          <Card className="backdrop-blur-sm bg-white/95 shadow-strong">
            <CardHeader>
              <CardTitle className="text-2xl">Select Your Role</CardTitle>
              <CardDescription>Choose your access level to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role.value}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedRole === role.value
                      ? "border-primary bg-primary/5 shadow-medium"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                  onClick={() => setSelectedRole(role.value)}
                >
                  <div className="flex items-start space-x-3">
                    <role.icon className={`h-6 w-6 mt-0.5 ${selectedRole === role.value ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="flex-1">
                      <h3 className={`font-medium ${selectedRole === role.value ? "text-primary" : "text-foreground"}`}>
                        {role.label}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Login Form */}
          <Card className="backdrop-blur-sm bg-white/95 shadow-strong">
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Enter your credentials to access the system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-primary hover:shadow-medium transition-all duration-300"
                  disabled={!selectedRole}
                >
                  Sign In as {selectedRole ? roles.find(r => r.value === selectedRole)?.label : "..."}
                </Button>

                <div className="text-center">
                  <Button variant="ghost" type="button" className="text-sm">
                    Forgot your password?
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Demo System • Contact IT Support for account assistance
          </p>
        </div>
      </div>
    </div>
  );
}