const buttonVariants = {
  primary: `bg-accent text-surface px-4 py-2.5 rounded-md text-body font-medium hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed1`,
  secondary: `border border-line bg-surface text-ink px-4 py-2.5 rounded-md text-body font-medium hover:bg-paper`,
  ghost: `text-danger px-2 py-1 text-sm font-medium hover:underline`,
  destructive: `border border-danger text-danger px-4 py-2.5 rounded-md hover:bg-danger-soft`,
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = `flex items-center justify-center gap-1 uppercase tracking-wider`;
  const variantStyles = buttonVariants[variant] || buttonVariants.primary;
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
