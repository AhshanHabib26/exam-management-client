import Styles from "../style/DashboardLoader.module.css";

export const DashboardLoader = () => {
  return (
    <div className="flex items-center justify-center mt-24">
      <span className={Styles.loader}></span>;
    </div>
  );
};
