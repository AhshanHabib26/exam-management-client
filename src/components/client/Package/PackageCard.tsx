import { Link, useNavigate } from "react-router-dom";
import { TPackageProps } from "@/types/common.data";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import DiamondImg from "../../../assets/icons/diamond.png";
import moment from "moment";
const PackageCard: React.FC<TPackageProps> = ({ service, isCheckout }) => {
  const token = useAppSelector(useCurrentToken);
  const navigate = useNavigate();
  const handleEnrollClick = (serviceId: string) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/checkout?id=${serviceId}`);
    }
  };
  const daysLeft = moment(service?.offerEndDate).diff(moment(), "days");
  return (
    <div className=" shadow-md bg-gray-900">
      <h1 className="p-2 bg-gray-800 text-center text-xl hind-siliguri-regular text-white">
        {service?.title}
      </h1>
      <div className="flex items-center justify-center my-2">
        <p className="text-lg hind-siliguri-light mr-2">Package Price : </p>
        <div className="flex items-center">
          <p className="text-lg hind-siliguri-light mr-2">TK</p>
          {service?.isOfferActive ? (
            <h1 className="text-xl hind-siliguri-light line-through text-red-500">
              {service?.price}
            </h1>
          ) : (
            <h1 className="text-2xl font-medium">{service?.price}</h1>
          )}
        </div>
        <div className="flex items-center">
          {service?.isOfferActive ? (
            <h1 className="text-2xl ml-2 font-medium">{service?.offerPrice}</h1>
          ) : null}
        </div>
      </div>
      <hr className="border-[0.5] border-gray-700 border-dashed" />

      <div className="my-7 relative">
        <div className="flex items-center justify-center gap-2">
          <img src={DiamondImg} alt="" className=" w-[40px]" />
          <p className="text-4xl font-semibold">{service?.points}</p>
        </div>
        {service?.isOfferActive ? (
          <div className="text-center mt-2 absolute right-0 top-14">
            <p className="text-[15px] font-extralight bg-BgPrimary px-2 transform rotate-90 origin-top-right rounded-b-lg">
              {daysLeft > 0 ? `${daysLeft} days left` : ""}
            </p>
          </div>
        ) : null}
      </div>

      <div className="p-3">
        {isCheckout ? (
          <Link
            className="bg-orange-500 hover:bg-orange-600 inline-block w-full text-center text-lg hind-siliguri-regular text-white p-2 rounded-md"
            to="/price-plan"
          >
            See Another Package
          </Link>
        ) : (
          <div>
            <button
              className="bg-gray-800 hover:bg-BgPrimaryHover inline-block w-full text-center text-lg hind-siliguri-regular text-white p-2 rounded-md"
              onClick={() => handleEnrollClick(service._id)}
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageCard;
