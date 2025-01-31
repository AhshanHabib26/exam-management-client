import {
  FaLaptopCode,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaSquareGithub,
} from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";

const FooterConatctInfo = () => {
  return (
    <div>
      <h1 className="text-xl  font-semibold mb-1">About Us</h1>
      <div>
        <div className="flex items-center">
          <FaLocationDot size={15} />
          <p className="text-[16px] font-light ml-1">Dhaka, Bangladesh</p>
        </div>
        <div className="flex items-center">
          <FaPhone size={15} />
          <a
            className="text-[16px] font-light ml-1"
            href="callto:+8801646418365"
          >
            +8801646418365
          </a>
        </div>
        <div className="flex items-center">
          <MdMail size={15} />
          <a
            className="text-[16px] font-light ml-1"
            href="mailto:ahshan.habib026@gmail.com"
          >
            ahshan.habib026@gmail.com
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <a target="_blank" href="https://web.facebook.com/AhshanHabib26">
          <FaFacebookSquare size={18} />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/ahshanhabib26/">
          <FaLinkedin size={18} />
        </a>
        <a target="_blank" href="https://github.com/AhshanHabib26">
          <FaSquareGithub size={18} />
        </a>
        <a target="_blank" href="https://leetcode.com/u/AhshanHabib/">
          <FaLaptopCode size={18} />
        </a>
        <Link to="/">
          <IoLogoYoutube size={18} />
        </Link>
      </div>
    </div>
  );
};

export default FooterConatctInfo;
