import "./button.scss";

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export const Button = ({
  onClick,
  disabled = false,
  variant = "primary",
  children,
}: ButtonProps) => {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
