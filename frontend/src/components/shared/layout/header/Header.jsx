import Searchbar from "./searchbar/Searchbar";
import { profilePlaceHolder } from "../../../../assets/images";

const Header = () => {
  return (
    <header className=" w-full h-[78px] flex items-center justify-between gap-4 px-6">
      <h2 className="text-4xl font-bold capitalize text-primary-600 ">
        overview
      </h2>
      <Searchbar />
      <img
        src={profilePlaceHolder}
        alt="profile placeholder"
        className="h-10 w-10 rounded-full cursor-pointer"
        draggable={false}
        loading="lazy"
      />
    </header>
  );
};

export default Header;
