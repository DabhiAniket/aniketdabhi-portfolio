import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

const ProjectsBtn = () => {
  return (
    <div className="mx-auto xl:mx-0">
      <Link
        to="/work"
        aria-label="View my projects"
        className="relative w-40 h-40 sm:w-46.25 sm:h-46.25 flex justify-center items-center bg-circle-star bg-cover bg-center bg-no-repeat group"
      >
        <img
          src="/rounded-text.png"
          alt=""
          width={141}
          height={148}
          className="animate-spin-slow w-full h-full max-w-35.25 max-h-37 pointer-events-none select-none"
        />
        <HiArrowRight
          className="absolute text-4xl group-hover:translate-x-2 transition-transform duration-300"
          aria-hidden
        />
      </Link>
    </div>
  );
};

export default ProjectsBtn;
