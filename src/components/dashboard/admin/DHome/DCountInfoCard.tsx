import React from "react";

interface CardProps {
  count: number;
  icon: React.ReactNode;
  bColor: string;
  tColor: string;
  label: string;
}

const DCountInfoCard: React.FC<CardProps> = ({
  count,
  icon,
  bColor,
  tColor,
  label,
}) => {
  return (
    <div className={`shadow `}>
      <div className="flex items-center flex-col p-4">
        <div className="flex items-center gap-2">
          <p>{icon}</p>
          <p className={`text-2xl font-medium mt-1 ${tColor}`}>{count ?? 0}</p>
        </div>
        <div>
          <p className={`text-lg font-normal text-center ${tColor}`}>{label}</p>
        </div>

      </div>
      <div className={`${bColor} p-[2px] `}></div>
    </div>
  );
};

export default DCountInfoCard;
