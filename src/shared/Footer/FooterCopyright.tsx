import { FaRegCopyright } from "react-icons/fa6";

const FooterCopyright = () => {
  const date = new Date();
  const fullYear: number = date.getFullYear();

  return (
    <div className="text-white flex justify-center ">
      <FaRegCopyright size={16} className="mt-1" />
      <p className="text-[16px] font-light ml-1">
        {fullYear} Nihamsquiz all rights reserved.{" "} Design and Develop by
        <a
          target="_blank"
          className="text-TextPrimary ml-1"
          href="https://www.linkedin.com/in/ahshanhabib26/"
        >
          Ahshan Habib
        </a>
      </p>
    </div>
  );
};

export default FooterCopyright;
