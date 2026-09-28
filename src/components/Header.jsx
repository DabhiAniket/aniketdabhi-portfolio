import { Link } from "react-router-dom";

import Socials from "@/components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full items-center px-4 sm:px-16 xl:px-0 xl:h-22.5">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-5 sm:gap-y-6 py-6 sm:py-8">
          <Link to="/" aria-label="Home">
            <img
              src="/logo.webp"
              alt="Aniket Dabhi"
              width={215}
              height={72}
              fetchPriority="high"
              className="w-45 sm:w-53.75 h-auto"
            />
          </Link>

          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;
