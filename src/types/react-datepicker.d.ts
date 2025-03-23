declare module 'react-datepicker' {
  import { ComponentType } from 'react';

  interface DatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    selectsStart?: boolean;
    selectsEnd?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    minDate?: Date | null;
    className?: string;
  }

  const DatePicker: ComponentType<DatePickerProps>;
  export default DatePicker;
} 