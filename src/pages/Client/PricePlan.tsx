import FAQPricePlan from "@/components/client/Package/FAQPricePlan";
import PricePlan from "@/components/client/Package/PricePlan";
const PricePlanPage = () => {
  return (
    <div className="mt-24 lg:mt-28 min-h-screen mx-4">
      <PricePlan />
      <FAQPricePlan />
    </div>
  );
};

export default PricePlanPage;
