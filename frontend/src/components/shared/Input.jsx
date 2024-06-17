const Input = ({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  width,
  height,
  element,
  rows,
}) => {
  return element === "input" ? (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      className={`${width ? width : "w-full"} ${
        height ? height : "h-10"
      } bg-transparent flex-1 outline-none text-base text-neutral-600 dark:text-neutral-200 font-medium placeholder:text-neutral-600 dark:placeholder:text-neutral-200 p-2 placeholder:text-base placeholder:font-medium border border-primary-600 rounded-xl`}
      onChange={onChange}
      aria-labelledby={name}
    />
  ) : (
    <textarea
      name={name}
      id={id}
      rows={rows || 3}
      placeholder={placeholder}
      className={`${width ? width : "w-full"} ${
        height ? height : "h-10"
      } bg-transparent flex-1 outline-none text-base text-neutral-600 dark:text-neutral-200 font-medium placeholder:text-neutral-600 dark:placeholder:text-neutral-200 p-2 placeholder:text-base placeholder:font-medium border border-primary-600 rounded-xl`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
