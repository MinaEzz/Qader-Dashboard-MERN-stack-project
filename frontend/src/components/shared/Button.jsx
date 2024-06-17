import { Link } from "react-router-dom";

const Button = ({
  label,
  icon,
  href,
  to,
  onClick,
  type,
  width,
  height,
  fontSize,
  fontWeight,
  backgroundColor,
  hoverBgColor,
  activeBgColor,
  target,
}) => {
  if (href) {
    return (
      <button
        className={`${width ? width : "w-full"} 
      ${height ? height : "h-14"}
      ${
        backgroundColor
          ? backgroundColor
          : "bg-primary-600 hover:bg-primary-700 active:bg-primary-800"
      } ${hoverBgColor ? hoverBgColor : null} ${
        activeBgColor ? activeBgColor : null
      } ${fontWeight ? fontWeight : null} rounded-xl px-2 transition-all`}
      >
        <a
          className={`flex items-center justify-center space-x-2 ${
            fontSize ? fontSize : "text-2xl"
          } capitalize text-white w-full h-full`}
          href={href}
          rel="noreferrer"
          target={target}
        >
          <span>{label}</span>
          {icon && icon}
        </a>
      </button>
    );
  }
  if (to) {
    return (
      <button
        className={`${width ? width : "w-full"} 
        ${height ? height : "h-14"}
        ${
          backgroundColor
            ? backgroundColor
            : "bg-primary-600 hover:bg-primary-700 active:bg-primary-800"
        } ${hoverBgColor ? hoverBgColor : null} ${
          activeBgColor ? activeBgColor : null
        } ${fontWeight ? fontWeight : null} rounded-xl px-2 transition-all`}
      >
        <Link
          className={`flex items-center justify-center space-x-2 ${
            fontSize ? fontSize : "text-2xl"
          } capitalize text-white w-full h-full`}
          to={to}
        >
          <span>{label}</span>
          {icon && icon}
        </Link>
      </button>
    );
  }

  return (
    <button
      className={`${width ? width : "w-full"} ${height ? height : "h-14"}
      ${
        backgroundColor
          ? backgroundColor
          : "bg-primary-600 hover:bg-primary-700 active:bg-primary-800"
      } 
      ${hoverBgColor ? hoverBgColor : null} ${
        activeBgColor ? activeBgColor : null
      } 
      rounded-xl px-2 transition-all flex items-center justify-center space-x-2 
      ${fontSize ? fontSize : "text-2xl"} ${
        fontWeight ? fontWeight : null
      } capitalize text-white`}
      type={type}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
