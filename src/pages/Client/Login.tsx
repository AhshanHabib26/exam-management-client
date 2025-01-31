
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
import { verifyToken } from "@/lib/verifyToken";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TUser } from "@/types/user.type";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        phoneNum,
        password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      // Dispatch the user and token
      dispatch(setUser({ user, token: res.data.accessToken }));

      // Show success toast
      toast.success("Logged in successfully!", { id: toastId, duration: 500 });

      // Early return if no access token is found
      if (!res.data.accessToken || !user) {
        navigate("/");
        return;
      }

      // Navigate based on user role
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "user":
          navigate("/user/dashboard");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const errorMessage = (error as { data: { message: string } }).data.message;
        toast.error(errorMessage || "Something went wrong!", { id: toastId, duration: 500 });
      } else {
        toast.error("An unexpected error occurred.", { id: toastId, duration: 500 });
      }
    }
  };

  return (
    <div style={{
      background:
        "linear-gradient(90deg, rgba(12,18,23,1) 0%, rgba(20,13,25,1) 50%)",
    }} className="flex items-center justify-center h-screen flex-col">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your phone number below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phoneNum">Mobile Number</Label>
                <Input
                  type="text"
                  name="phoneNum"
                  placeholder="01XXXXXXXXX"
                  autoComplete="off"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
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

              </div>
              <Button type="submit" className="w-full select-none">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Register
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

export default LoginPage;
