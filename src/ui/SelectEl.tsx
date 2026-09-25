type SelectElProps = React.ComponentProps<"select">;

export default function SelectEl({
  children,
  className,
  ...props
}: SelectElProps) {
  return (
    <div
      className={`relative inline-flex items-center bg-ink border border-ink-soft select-wrapper overflow-hidden ${className}`}
    >
      <select
        className={`w-full text-sm appearance-none py-2 px-4 cursor-pointer bg-ink rounded-inherit focus:ring-accent focus:border-accent`}
        {...props}
      >
        {children}
      </select>

      {/* Custom Dropdown Icon Container */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
