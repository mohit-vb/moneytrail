const baseStyles =
  "w-full rounded-md px-3 py-2.5 text-body placeholder:text-muted focus:outline-none focus:ring-1 transition-all";

const normalStyles =
  "border border-ink-soft focus:ring-accent focus:border-accent";
const errorStyles =
  "border border-danger focus:ring-danger focus:border-danger";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  ref?: React.RefObject<HTMLInputElement> | null;
}

export default function InputEl({
  error,
  ref,
  className,
  ...props
}: InputProps) {
  const stateStyles = error ? errorStyles : normalStyles;

  return (
    <>
      <input
        ref={ref}
        className={`${baseStyles} ${stateStyles} ${className}`}
        {...props}
      />
      {error && <p className="text-danger text-meta mt-1 ">{error}</p>}
    </>
  );
}
