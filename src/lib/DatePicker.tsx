import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const DatePicker = ({
  label,
  date,
  onChange,
}: {
  label: string;
  date?: string;
  onChange: (date: string) => void;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn("h-[50px] justify-start text-left font-normal text-gray-500")}
      >
        <CalendarIcon />
        {date ? format(new Date(date), "PPP") : <span>{label}</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={date ? new Date(date) : undefined}
        onSelect={(selectedDate) =>
          onChange(selectedDate ? selectedDate.toISOString().split("T")[0] : "")
        }
        initialFocus
      />
    </PopoverContent>
  </Popover>
);
