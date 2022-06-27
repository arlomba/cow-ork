const sizes = {
  sm: "px-4 py-2",
  md: "px-6 py-3",
  lg: "px-8 py-4",
};

const variants = {
  filled: {
    primary: "bg-indigo-800 text-white dark:bg-emerald-800 font-bold",
    secondary: "bg-slate-800 text-white dark:bg-slate-600 font-bold",
    success: "bg-green-800 text-white font-bold",
    error: "bg-red-800 text-white font-bold",
  },
  flat: {
    primary:
      "bg-indigo-200 text-indigo-800 dark:bg-emerald-200 dark:text-emerald-800 font-bold",
    secondary: "bg-slate-200 text-slate-800 font-bold",
    success: "bg-green-200 text-green-800 font-bold",
    error: "bg-red-200 text-red-800 font-bold",
  },
  outlined: {
    primary:
      "bg-indigo-200 text-indigo-800 border border-indigo-800 dark:bg-emerald-200 dark:text-emerald-800 dark:border-emerald-800 font-bold",
    secondary: "bg-slate-200 text-slate-800 border border-slate-800 font-bold",
    success: "bg-green-200 text-green-800  border border-green-800 font-bold",
    error: "bg-red-200 text-red-800 border border-red-800 font-bold",
  },
};

const shapes = {
  rounded: "rounded",
  squared: "rounded-none",
};

export default function Button({
  color = "primary",
  icon,
  shape = "squared",
  size = "md",
  variant = "filled",
  ...props
}) {
  props.className = [
    shapes[shape],
    sizes[size],
    variants[variant][color],
    props.className,
  ]
    .join(" ")
    .trim();

  return (
    <button {...props}>
      <div className="flex">
        {icon && <span className="mr-2">{icon}</span>}
        <span>{props.children}</span>
      </div>
    </button>
  );
}
