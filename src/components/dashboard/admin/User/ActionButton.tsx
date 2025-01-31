import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  onClick: () => void;
  isLoading: boolean;
  loadingText: string;
  defaultText: string;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  isLoading,
  loadingText,
  defaultText,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      className={`bg-blue-500 hover:bg-blue-600 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={isLoading}
    >
      {isLoading ? loadingText : defaultText}
    </Button>
  );
};
