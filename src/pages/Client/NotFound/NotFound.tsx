import { Link } from "react-router-dom";
import NotFoundImg from "../../../assets/images/NotFound.gif";

const NotFoundPage = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen flex-col">
        <img src={NotFoundImg} width={200} height={200} alt="Not Found Image" />
        <div className="mt-4 bg-BgPrimary hover:bg-BgPrimaryHover p-3 rounded-md text-white text-md font-light">
          <Link to="/">Return Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
