import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const BASE_URL = "http://localhost:8080"; // Replace with your actual API base URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
    }
    if (!agreedToTerms) {
      return toast({
        title: "Error",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
    }

    setIsLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "ROLE_BIDDER", // or let user choose
      };
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        payload
      );
      toast({
        title: "Success",
        description: data.message,
      });
      navigate("/login");
    } catch (err: any) {
      toast({
        title: "Signup failed",
        description:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
          >
            <Car className="h-8 w-8 text-orange-500" />
            <span>BidCars</span>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Create your account
            </CardTitle>
            <CardDescription>
              Join thousands of car enthusiasts and start bidding today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* name fields */}
              <div className="grid grid-cols-2 gap-4">
                {["firstName", "lastName"].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>
                      {field === "firstName" ? "First Name" : "Last Name"}
                    </Label>
                    <Input
                      id={field}
                      name={field}
                      placeholder={field === "firstName" ? "John" : "Doe"}
                      value={(formData as any)[field]}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                ))}
              </div>

              {/* email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* password */}
              {["password", "confirmPassword"].map((field, idx) => {
                const show = idx === 0 ? showPassword : showConfirmPassword;
                const toggle = idx === 0 ? setShowPassword : setShowConfirmPassword;
                return (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>
                      {idx === 0 ? "Password" : "Confirm Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id={field}
                        name={field}
                        type={show ? "text" : "password"}
                        placeholder={
                          idx === 0 ? "Create a strong password" : "Confirm your password"
                        }
                        value={(formData as any)[field]}
                        onChange={handleInputChange}
                        required
                        className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => toggle(!show)}
                      >
                        {show ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}

              {/* terms */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* submit */}
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
