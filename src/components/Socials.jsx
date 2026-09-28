import { personalData } from "@/data/portfolio";
import {
  RiLinkedinLine,
  RiGithubLine,
  RiMailLine,
  RiWhatsappLine,
} from "react-icons/ri";

export const socialData = [
  {
    name: "Github",
    link: personalData.contact.github,
    Icon: RiGithubLine,
  },
  {
    name: "LinkedIn",
    link: personalData.contact.linkedin,
    Icon: RiLinkedinLine,
  },
  {
    name: "Email",
    link: `mailto:${personalData.contact.email}`,
    Icon: RiMailLine,
  },
  {
    name: "WhatsApp",
    link: "https://wa.me/918128516165?text=Hi%20Aniket%2C%20I%20have%20a%20web%20development%20project%20and%20would%20like%20to%20discuss%20the%20requirements%20with%20you.",
    Icon: RiWhatsappLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-6 sm:gap-x-5 text-lg">
      {socialData.map((social, i) => (
        <a
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel={social.name === "Github" || social.name === "LinkedIn" ? "me noopener noreferrer" : "noopener noreferrer"}
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-1.25 hover:text-white"
              : "hover:text-accent"
          } transition-all duration-300`}
        >
          <social.Icon aria-hidden />
          <span className="sr-only">{social.name}</span>
        </a>
      ))}
    </div>
  );
};

export default Socials;
