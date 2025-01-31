import Container from "@/lib/Container";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

const Banner = () => {

  const token = useAppSelector(useCurrentToken);

  return (
    <div>
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center justify-center flex-col">
            <p className=" text-lg hind-siliguri-light select-none">
              Introducing <span className=" text-TextPrimaryHover">Award Winning Quiz Website</span>
            </p>
            <h1 className="text-4xl lg:text-7xl text-center hind-siliguri-bold max-w-[25ch] my-2 select-none">🎉Challenge Your Mind, One Question at a Time!</h1>
            <p className="text-lg lg:text-xl hind-siliguri-light mb-3 text-center select-none">
              Explore quizzes, unlock achievements, and master new topics. Join
              the fun today!
            </p>
            <div>
              {
                token ? <Link to="/blog">
                  <Button
                    size="lg"
                    className=" bg-green-700 hover:bg-green-600 text-lg font-light"
                  >
                    Explore Now
                  </Button>
                </Link> : <Link to="/login">
                  <Button
                    size="lg"
                    className=" bg-BgPrimary hover:bg-BgPrimaryHover text-lg font-light"
                  >
                    Get Started
                  </Button>
                </Link>
              }
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
