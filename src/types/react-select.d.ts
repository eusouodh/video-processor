declare module 'react-select' {
  import { ComponentType } from 'react';

  interface Option {
    value: string;
    label: string;
  }

  interface SelectProps<T extends Option> {
    options: T[];
    onChange: (option: T | null) => void;
    value: T | null;
    styles?: any;
    className?: string;
  }

  const Select: ComponentType<SelectProps<any>>;
  export default Select;
} 