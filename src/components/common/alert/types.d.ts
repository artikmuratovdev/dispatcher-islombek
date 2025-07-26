export interface AlertProps {
    children?: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
    id?: string;
  }
  