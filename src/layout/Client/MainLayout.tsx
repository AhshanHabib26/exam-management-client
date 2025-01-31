import Footer from "@/shared/Footer/Footer";
import TopNav from "@/shared/Navbar/TopNav";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  // Check if the current path is the home page
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <TopNav />
      <div className=" min-h-screen">
        <Outlet />
      </div>
      {/* Render Footer only if not on the home page */}
      {!isHomePage && <Footer />}
    </div>
  );
};

export default MainLayout;
