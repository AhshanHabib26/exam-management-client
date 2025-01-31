import { Link } from "react-router-dom";

const FooterImportantLinks = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-1">Important Links</h1>
      <div>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/"
        >
          Join Affeliate
        </Link>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/"
        >
          Career
        </Link>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/"
        >
          Privacy Policy
        </Link>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/"
        >
          Refund Policy
        </Link>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/"
        >
          Disclaimar
        </Link>
      </div>
    </div>
  );
};

export default FooterImportantLinks;
