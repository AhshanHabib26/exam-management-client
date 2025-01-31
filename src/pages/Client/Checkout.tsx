import MannualPayment from "@/components/client/Checkout/MannualPayment";
import PackageCard from "@/components/client/Package/PackageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Container from "@/lib/Container";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetSinglePackageQuery } from "@/redux/features/package/packageApi";
import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const [isManualPaymentVisible, setIsManualPaymentVisible] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceId = params.get("id");
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSinglePackageQuery(serviceId);
  const service = data?.data?.result;


  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);



  return (
    <div className=" min-h-screen">
      <div className="mt-20 lg:mt-24">
        <Container>
          <h1 className="text-center text-xl font-semibold mb-5">
            {service?.title} প্যাকেজ ইনভয়েস
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto gap-5">
            <div>
              <PackageCard
                service={service}
                key={service?._id}
                isCheckout={true}
              />
            </div>
            <div className="border border-gray-900 rounded-lg p-4">
              <div>
                <div className="flex items-center justify-between text-lg font-medium">
                  <h1>Sub Total</h1>
                  <div className="flex items-center gap-1">
                    <p>ট</p>
                    <p>{service?.price}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-lg font-medium">
                  <h1>Discount</h1>
                  <div className="flex items-center gap-1">
                    <p>ট</p>
                    <p>{service?.price - service?.offerPrice}</p>
                  </div>
                </div>
                <Separator className="bg-gray-900 my-4" />
                <div className="flex items-center justify-between text-lg font-medium">
                  <h1>Payable Amount</h1>
                  <div className="flex items-center gap-1">
                    <p>ট</p>
                    <p>{service?.offerPrice}</p>
                  </div>
                </div>
              </div>
              <Separator className="bg-gray-900 my-4" />

              <div>
                <h1 className="text-lg font-light">Select Payment Method:</h1>
                <div className="mt-3 flex items-center justify-between">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setIsManualPaymentVisible((prev) => !prev)} // Toggle visibility of Manual Payment component
                  >
                    {isManualPaymentVisible
                      ? "Hide Payment"
                      : "Manual Payment"}
                  </Button>
                  <Button
                    size="lg"
                    className="bg-BgPrimary hover:bg-BgPrimaryHover"
                  >
                    SSLCommerz
                  </Button>
                </div>
                {isManualPaymentVisible ? (
                  <MannualPayment service={service} />
                ) : (
                  <div className="flex items-center justify-center mt-20">
                    <FaCreditCard size={50} className="text-gray-800" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CheckoutPage;
