const StateCard = ({ icon, title, number }) => {
  return (
    <div className="flex flex-1 bg-white p-3 pl-0 items-center rounded-sm border border-neutral-200">
      <div className="p-3 rounded-tr-3xl rounded-br-3xl bg-primary-600 ">
        {icon}
      </div>
      {/* ./element icon */}
      <div className="flex flex-col px-2">
        <p className="text-sm capitalize text-neutral-500 font-medium">
          {title}
        </p>
        <strong className="text-base font-semibold text-black">
          ${number}
        </strong>
      </div>
      {/* ./element description */}
    </div>
  );
};

export default StateCard;
