import { Separator } from "@/components/ui/separator";
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const DSection: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="mt-6">
      <div className="mb-3">
        <h1 className="text-xl font-medium text-gray-600">{title}</h1>
        <Separator className="bg-gray-200" />
      </div>
      {children}
    </div>
  );
};

export default DSection;
