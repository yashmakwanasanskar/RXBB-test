import { appName } from "@/constants";
import { Link } from "react-router-dom";

const BlankNavbar = () => {
  return (
    <header className="w-full z-10 border-[#D0CFD28A] border-b">
      <nav className="mx-auto flex justify-center py-4 px-6 sm:px-8 ">
        <div className="flex items-center">
          <Link to="/" className="flex justify-center items-center">
            <img
              src="/RxBB Logo.png"
              alt={appName}
              className="object-contain w-[170px] md:w-[250px]"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default BlankNavbar;
