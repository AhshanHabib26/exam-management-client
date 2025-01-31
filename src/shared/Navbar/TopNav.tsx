import { Button } from "@/components/ui/button";
import Container from "@/lib/Container";
import { formattedBanglaDate } from "@/lib/ConvertDateInBangla";
import { FaBars, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdDashboard, MdOutlineQuiz } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { useAppSelector } from "@/redux/hooks";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { FaQuestion } from "react-icons/fa6";

const TopNav = () => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const roleToDashboard: Record<string, string> = {
    admin: "/admin/dashboard",
    user: "/user/dashboard",
  };

  return (
    <div className="bg-gray-900 py-3 top-0 fixed w-full z-50">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div>
              <Link to="/">
              <h1 className="text-TextPrimary text-xl uppercase hind-siliguri-semibold">
                nihamsquiz
              </h1>
              </Link>
            </div>
            <div className="hidden lg:block">
              {
                token && <div className="flex items-center gap-4">

                  <Link className="text-lg text-TextPrimary hover:text-TextPrimaryHover" to="/">
                    Home
                  </Link>
                  <Link className="text-lg text-TextPrimary hover:text-TextPrimaryHover" to="/mcq">
                    Daily MCQ
                  </Link>
                  <Link className="text-lg text-TextPrimary hover:text-TextPrimaryHover" to="/exam">
                    Exam
                  </Link>
                  <Link
                    className="text-lg text-TextPrimary hover:text-TextPrimaryHover"
                    to="/price-plan"
                  >
                    Price Plan
                  </Link>

                  <>
                    {user?.role && roleToDashboard[user.role] ? (
                      <Link
                        className="text-lg text-TextPrimary hover:text-TextPrimaryHover"
                        to={roleToDashboard[user.role]}
                      >
                        Dashboard
                      </Link>
                    ) : null}
                  </>
                </div>
              }
            </div>
          </div>
          <div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-5">
                <p className="text-TextPrimary text-lg">{formattedBanglaDate}</p>
                {token ? (
                  <div>
                    <Button
                      onClick={handleLogout}
                      size="lg"
                      className=" bg-red-600 hover:bg-red-700 text-lg font-light"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">
                      <Button
                        size="lg"
                        className=" bg-BgPrimary hover:bg-BgPrimaryHover text-lg font-light"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className=" block lg:hidden">
              <Sheet>
                <SheetTrigger>
                  <FaBars className="text-white" />
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[250px] bg-gray-900 border-r-0"
                >
                  <SheetHeader>
                    <SheetTitle className="flex items-start">
                      <Link
                        className="text-xl text-gray-300 uppercase font-bold"
                        to="/"
                      >
                        Nihamsquiz
                      </Link>
                    </SheetTitle>
                    <hr className="border-dashed border-gray-700" />
                    <SheetDescription className="flex items-start flex-col">
                      {
                        token && <div className="flex flex-col items-start gap-2 mt-3">
                          <Link
                            className="text-lg text-gray-300 hover:text-TextPrimary"
                            to="/"
                          >
                            <span className="flex items-center gap-1">
                              <FaHome size={16} /> Home
                            </span>
                          </Link>

                          <Link
                            className="text-lg text-gray-300 hover:text-TextPrimary"
                            to="/mcq"
                          >
                            <span className="flex items-center gap-1">
                              <FaQuestion size={16} /> Daily MCQ
                            </span>
                          </Link>

                          <Link
                            className="text-lg text-gray-300 hover:text-TextPrimary"
                            to="/exam"
                          >
                            <span className="flex items-center gap-1">
                              <MdOutlineQuiz size={16} /> Exam
                            </span>
                          </Link>

                          <Link
                            className="text-lg text-gray-300 hover:text-TextPrimary"
                            to="/price-plan"
                          >
                            <span className="flex items-center gap-1">
                              <IoIosPricetags size={16} /> Price Plan
                            </span>
                          </Link>

                          {/* <Link
                          className="text-lg text-gray-300 hover:text-TextPrimary"
                          to="/about-us"
                        >
                          <span className="flex items-center gap-1">
                            <FaUser size={16} /> About Us
                          </span>
                        </Link> */}

                          <>
                            {user?.role && roleToDashboard[user.role] ? (
                              <Link
                                className="text-lg text-gray-300 hover:text-TextPrimary"
                                to={roleToDashboard[user.role]}
                              >
                                <span className="flex items-center gap-1"> <MdDashboard size={16} />  Dashboard</span>
                              </Link>
                            ) : null}
                          </>

                        </div>
                      }
                      {token ? (
                        <div className=" w-full mt-5">
                          <Button
                            onClick={handleLogout}
                            size="lg"
                            className=" w-full bg-red-600 hover:bg-red-700 text-lg font-light"
                          >
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <div className=" w-full mt-5">
                          <Link to="/login">
                            <Button
                              size="lg"
                              className=" w-full bg-BgPrimary hover:bg-BgPrimaryHover text-lg font-light"
                            >
                              Get Started
                            </Button>
                          </Link>
                        </div>
                      )}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopNav;
