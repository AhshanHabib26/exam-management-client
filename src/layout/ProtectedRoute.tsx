import { verifyToken } from "@/lib/verifyToken";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }
  const dispatch = useAppDispatch();

  if (role !== undefined && role !== (user as { role: string })?.role) {
    dispatch(logout())
    return <Navigate to="/" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
