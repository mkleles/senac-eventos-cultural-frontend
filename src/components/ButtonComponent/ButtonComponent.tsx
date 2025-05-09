import type { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const ButtonComponent: FC<ButtonProps> = ({ children }) => (
  <button>{children}</button>
);

export default ButtonComponent;
