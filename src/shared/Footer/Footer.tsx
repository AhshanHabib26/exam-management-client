
import Container from "@/lib/Container";
import FooterConatctInfo from "./FooterConatctInfo";
import FooterCopyright from "./FooterCopyright";
import FooterImportantLinks from "./FooterImportantLinks";
import FooterInfo from "./FooterInfo";
import FooterOtherLinks from "./FooterOtherLinks";
const Footer = () => {
  return (
    <div className="mt-10">
      <div className={`bg-gray-900 py-5`}>
        <Container>
          <div className="text-white grid grid-cols-1 lg:grid-cols-4 gap-5">
            <FooterInfo />
            <FooterImportantLinks />
            <FooterOtherLinks />
            <FooterConatctInfo />
          </div>
          <hr className="border-dashed border-gray-800 my-5" />
          <FooterCopyright />
        </Container>
      </div>
    </div>
  );
};

export default Footer;
