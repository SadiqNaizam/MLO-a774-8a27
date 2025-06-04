import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // For structure, real form needs react-hook-form
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, DoorOpen, UserPlus } from 'lucide-react'; // Doraemon's Bell, Door Open icon for login

const LoginPage = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const [email, setEmail] = useState('nobita@doraemon.com'); // Default credentials
  const [password, setPassword] = useState('doraemon'); // Default credentials
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  // Dummy form handling
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }
    console.log(`${isRegister ? 'Registering' : 'Logging in'} with:`, { email, password });
    // Simulate login/registration success
    if (email === 'nobita@doraemon.com' && password === 'doraemon' && !isRegister) {
      navigate('/'); // Navigate to homepage on successful login
    } else if (isRegister) {
      // Simulate registration success
      console.log('Registration successful, redirecting to login.');
      setIsRegister(false); // Switch to login form
    }
     else {
      setError('Invalid credentials or user not found. Try nobita@doraemon.com and "doraemon"');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-sky-300 to-blue-500 p-4">
      <div className="flex items-center mb-8 text-white">
        <Bell className="h-12 w-12 mr-3 text-yellow-300" />
        <h1 className="text-4xl font-bold">DoraTunes Login</h1>
      </div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{isRegister ? 'Create Your Account' : 'Access Your Music Pocket'}</CardTitle>
          <CardDescription>
            {isRegister ? 'Join the future of music!' : "Enter your credentials to open the Anywhere Door to tunes!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Using basic form elements for simplicity, real form uses Form components from shadcn with react-hook-form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Oops! Something went wrong!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div>
              <Label htmlFor="email">Email (e.g., nobita@doraemon.com)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password (e.g., doraemon)</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your Secret Gadget Code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            {isRegister && (
                 <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Secret Gadget Code"
                        // Add state and validation for confirm password
                        className="mt-1"
                    />
                </div>
            )}
            <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold">
              {isRegister ? <UserPlus className="mr-2 h-5 w-5" /> : <DoorOpen className="mr-2 h-5 w-5" />}
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
            <Button variant="link" onClick={() => setIsRegister(!isRegister)} className="text-sm text-blue-600 hover:text-blue-800">
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </Button>
            {!isRegister && (
                 <Button variant="link" className="text-sm text-muted-foreground hover:text-foreground">
                    Forgot your Time Furoshiki (Password)?
                 </Button>
            )}
        </CardFooter>
      </Card>
      <p className="mt-8 text-xs text-white/80">
        &copy; {new Date().getFullYear()} DoraTunes Inc. All gadgets reserved.
      </p>
    </div>
  );
};

export default LoginPage;