/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Creating account");
    try {
      const userInfo = {
        firstName,
        lastName,
        phoneNum,
        password,
      };

      const res = await register(userInfo).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 1000 });
        navigate(`/login`);
      }
    } catch (error) {
      if (error && typeof error === "object") {
        // Check if the error contains a nested structure with validation issues
        if ("data" in error) {
          const errorData = (error as { data: any }).data;

          // Try to parse the message or issues if it's a JSON string
          try {
            const parsedMessage = JSON.parse(errorData.message);
            if (Array.isArray(parsedMessage)) {
              // Iterate through validation issues
              parsedMessage.forEach((issue: any) => {
                toast.error(issue.message || "Validation error occurred.", {
                  id: toastId,
                  duration: 1000,
                });
              });
            } else {
              toast.error(errorData.message || "Something went wrong!", {
                id: toastId,
                duration: 1000,
              });
            }
          } catch {
            toast.error(errorData.message || "Something went wrong!", {
              id: toastId,
              duration: 1000,
            });
          }
        } else if ("err" in error) {
          const err = (error as { err: any }).err;

          if (err?.issues && Array.isArray(err.issues)) {
            // Iterate through the `issues` array for detailed messages
            err.issues.forEach((issue: any) => {
              toast.error(issue.message || "Validation error occurred.", {
                id: toastId,
                duration: 1000,
              });
            });
          } else {
            toast.error("An unexpected error occurred.", { id: toastId, duration: 1000 });
          }
        } else {
          toast.error("An unexpected error occurred.", { id: toastId, duration: 1000 });
        }
      } else {
        toast.error("An unexpected error occurred.", { id: toastId, duration: 1000 });
      }

    }
  };

  return (
    <div style={{
      background:
        "linear-gradient(90deg, rgba(12,18,23,1) 0%, rgba(20,13,25,1) 50%)",
    }} className="flex items-center justify-center h-screen flex-col px-4 lg:px-0">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNum">Phone Number</Label>
                <Input
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  type="text"
                  autoComplete="off"
                  placeholder="01XXXXXXXXX"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">Password</label>
                <Input
                  id="password"
                  type={isShow ? "text" : "password"}
                  name="password"
                  placeholder="*********"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute top-2 right-3">
                  {isShow ? (
                    <Eye
                      size={20}
                      onClick={() => setIsShow(false)}
                      aria-label="Hide password"
                      className="cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      size={20}
                      onClick={() => setIsShow(true)}
                      aria-label="Show password"
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full select-none">
                Create an account
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="mt-2">
        <Link
          className="text-md font-thin text-gray-400 hover:text-TextPrimaryHover"
          to="/"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
