import { TUserProps } from "@/types/user.type";

const StatCard: React.FC<{ value: number; label: string; bg: string }> = ({
  value,
  label,
  bg,
}) => (
  <div
    className={`${bg} flex items-center justify-center flex-col p-3 md:p-6 lg:p-8 rounded-lg text-gray-700`}
  >
    <h1 className="text-2xl">{value}</h1>
    <p className="text-lg font-light">{label}</p>
  </div>
);

const UHomeCard: React.FC<TUserProps> = ({ user }) => {
  const availablePoints = user?.totalPoints || 0;
  const pointsDeducted = user?.pointsDeducted || 0;
  const quizzesAttempted = user?.quizzesAttempted || 0;
  const commentsCount = user?.comments?.length || 0;

  return (
    <div className="my-5 grid grid-cols-2 lg:grid-cols-4 gap-2">
      <StatCard
        value={availablePoints}
        label="Available Points"
        bg={availablePoints <= 10 ? "bg-red-300" : "bg-green-300"}
      />
      <StatCard
        value={pointsDeducted}
        label="Spend Points"
        bg="bg-orange-300"
      />
      <StatCard
        value={quizzesAttempted}
        label="Quiz Attempted"
        bg="bg-lime-300"
      />
      <StatCard value={commentsCount} label="Comments" bg="bg-gray-300" />
    </div>
  );
};

export default UHomeCard;
