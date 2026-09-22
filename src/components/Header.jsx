import { Link } from "react-router-dom";

import Socials from "@/components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full items-center px-16 xl-px-0 xl:h-22.5">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo"
              width={215}
              height={34}
              priority="true"
            />
          </Link>

          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;
