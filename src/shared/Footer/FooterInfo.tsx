import logoImg from "../../assets/images/logo.png";
const FooterInfo = () => {
  return (
    <div>
      <div>
        <div className="flex items-center mb-1">
          <img src={logoImg} className=" size-7" alt="Logo image" />
          <h1 className="text-xl font-semibold ml-1">Nihamsquiz</h1>
        </div>
        <p className="text-[16px] font-light">
          All kinds of mcq and guides as well as one of success in the care of
          skilled teachers Start your journey now to step forward. And on your
          journey to success We are always there.
        </p>
      </div>
    </div>
  );
};

export default FooterInfo;
