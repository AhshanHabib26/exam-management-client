import { TUserProps } from "@/types/user.type";
import { Link } from "react-router-dom";

const Notification: React.FC<TUserProps> = ({ user }) => {
  const isBuyPackage = user?.isBuyPackage;
  const isPremium = user?.isPremium;
  const totalPoints = user?.totalPoints ?? 0;

  let message = null;
  let bgColor = "bg-gray-300";
  const textColor = "text-gray-700";

  if (totalPoints === 0 && !isBuyPackage) {
    message = (
      <>
        ⌛ <strong>Your points have run out!</strong> ⌛
        <br />
        Don’t miss out on more quizzes! Please{" "}
        <strong className="font-medium">renew your package</strong> to continue enjoying the service.
        <Link
          to="/price-plan"
          className="text-TextPrimary hover:text-TextPrimaryHover ml-1"
        >
          Renew Plan
        </Link>
        .
      </>
    );
    bgColor = "bg-yellow-200";
  } else if (isBuyPackage && !isPremium) {
    message = (
      <>
        🎉 <strong>Thank you for purchasing our service!</strong> 🎉
        <br />
        🚀 Your account is being activated. Please hold on while we set everything up!
      </>
    );
    bgColor = "bg-orange-200";
  } else if (isPremium) {
    message = (
      <>
        🌟 <strong>Thank you for being a premium member!</strong> 🌟
        <br />
        We're thrilled to have you on board. Stay tuned for more exciting features and exclusive content!
      </>
    );
    bgColor = "bg-green-200";
  } else if (totalPoints === 100) {
    message = (
      <>
        <strong>🛑 You're on the Free Plan!</strong>
        <br />
        🎉 Start with {totalPoints ?? 0} points and explore our exams. Keep going to discover even more!
      </>
    );
    bgColor = "bg-red-200";
  } else if (totalPoints < 50) {
    message = (
      <>
        😔 Free quiz limit reached! Please{" "}
        <strong className="font-medium">subscribe to a package</strong>{" "}
        <Link
          to="/price-plan"
          className="text-TextPrimary hover:text-TextPrimaryHover"
        >
          See Available Plans
        </Link>{" "}
        to continue enjoying more quizzes.
      </>
    );
    bgColor = "bg-red-200";
  }

  return (
    <div>
      {message && (
        <h1
          className={`${bgColor} text-center p-3 rounded-lg text-[16px] ${textColor}`}
        >
          {message}
        </h1>
      )}
    </div>
  );
};

export default Notification;
