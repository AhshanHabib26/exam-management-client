import { Link } from "react-router-dom";

const FooterOtherLinks = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-1">Other Links</h1>
      <div>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/blog"
        >
          Blog
        </Link>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/"
        >
          Book Hub
        </Link>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/"
        >
          Free Notes & Guide
        </Link>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/"
        >
          Ebook Download
        </Link>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/"
        >
          Verify Certificate
        </Link>
        <Link
          className="block text-[16px] font-light hover:text-TextPrimary"
          to="/"
        >
          Play Quiz
        </Link>
      </div>
    </div>
  );
};

export default FooterOtherLinks;
