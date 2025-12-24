"use client";

import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react";

type DatePickerType = {
  value?: Date;
  onChange: (date?: Date) => void;
};

const DatePicker = ({ value, onChange }: DatePickerType) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-36 cursor-pointer justify-between border-gray-300">
          {value ? value.toLocaleDateString() : "Select date"}
          <CalendarDays />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
