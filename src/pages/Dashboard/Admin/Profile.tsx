import { Button } from "@/components/ui/button";
import { useGetuserProfileQuery } from "@/redux/features/auth/authApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import { Pen } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetuserProfileQuery({
    refetchOnMountOrArgChange: false,
  });
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <div className="mt-5">
        <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2">
            <h1 className=" w-[50px] h-[50px] bg-BgPrimary flex items-center justify-center rounded-full text-xl font-semibold text-white">
              {data?.data?.initials}
            </h1>
            <div>
              <p className="text-xl font-medium text-gray-800">
                {data?.data?.fullname}
              </p>
              <p className="text-sm uppercase text-TextPrimary">
                {data?.data?.role}
              </p>
            </div>
          </div>
          <div>
            <Button className=" bg-BgPrimary hover:bg-BgPrimaryHover">
              <Pen /> Edit
            </Button>
          </div>
        </div>
        <div className="my-5 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-medium text-gray-700">
                Personal Information
              </h1>
            </div>
            <div>
              <Button className=" bg-BgPrimary hover:bg-BgPrimaryHover">
                <Pen /> Edit
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            <div>
              <h1 className="text-lg font-light text-gray-500">First Name</h1>
              <p className="text-lg font-light text-gray-500">
                {data?.data?.firstname}
              </p>
            </div>
            <div>
              <h1 className="text-lg font-light text-gray-500">Last Name</h1>
              <p className="text-lg font-light text-gray-500">
                {data?.data?.lastname}
              </p>
            </div>
            <div>
              <h1 className="text-lg font-light text-gray-500">Email</h1>
              <p className="text-lg font-light text-gray-500">
                {data?.data?.email}
              </p>
            </div>
          </div>
        </div>
        <div className="my-5 border border-gray-200 rounded-lg p-6">
          <div>
            <h1 className="text-lg font-medium text-gray-700">
              Account Status
            </h1>
          </div>

          {data?.data?.isPremium ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
              {/* Premium Status */}
              <div>
                <h1 className="text-lg font-light text-gray-500">Premium</h1>
                <p className="text-lg font-light text-gray-500">
                  {data?.data?.isPremium ? "Active" : "Inactive"}
                </p>
              </div>

              {/* Available Points */}
              <div>
                <h1 className="text-lg font-light text-gray-500">
                  Available Points
                </h1>
                <p className="text-lg font-light text-gray-500 capitalize">
                  {data?.data?.totalPoints || "0"}
                </p>
              </div>

              {/* Points Deducted */}
              <div>
                <h1 className="text-lg font-light text-gray-500">
                  Points Spent
                </h1>
                <p className="text-lg font-light capitalize text-gray-500">
                  {data?.data?.pointsDeducted || "0"}
                </p>
              </div>

              {/* Quizzes Attempted */}
              <div>
                <h1 className="text-lg font-light text-gray-500">
                  Quizzes Attempted
                </h1>
                <p className="text-lg font-light text-gray-500 capitalize">
                  {data?.data?.quizzesAttempted || "0"}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center my-8">
              <h1 className="text-lg font-light text-gray-400">
                Waiting for Account Activation
              </h1>
              <p className="text-lg font-extralight text-gray-400">
                Please stay with us!
              </p>
            </div>
          )}
        </div>

        <div className="my-5 border border-gray-200 rounded-lg p-6">
          <div>
            <h1 className="text-lg font-medium text-gray-700">
              Payment Details
            </h1>
          </div>
          {data?.data?.paymentDetails ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
              {/* Payable Amount */}
              <div>
                <h1 className="text-lg font-light text-gray-500">
                  Payable Amount
                </h1>
                <p className="text-lg font-light text-gray-500">
                  {data?.data?.paymentDetails?.payableAmount || "N/A"}
                </p>
              </div>

              {/* Payment Method */}
              <div>
                <h1 className="text-lg font-light text-gray-500">
                  Payment Method
                </h1>
                <p className="text-lg font-light text-gray-500 capitalize">
                  {data?.data?.paymentDetails?.paymentMethod || "N/A"}
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <h1 className="text-lg font-light text-gray-500">
                  Phone Number
                </h1>
                <p className="text-lg font-light text-gray-500">
                  {data?.data?.paymentDetails?.phoneNumber || "N/A"}
                </p>
              </div>

              {/* Points */}
              <div>
                <h1 className="text-lg font-light text-gray-500">Points</h1>
                <p className="text-lg font-light text-gray-500">
                  {data?.data?.paymentDetails?.points || "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center my-8">
              <h1 className="text-lg font-light text-gray-400">
                Buy Points and enjoy our new features
              </h1>
              <p className="text-lg font-extralight text-gray-400">
                Please stay with us!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
