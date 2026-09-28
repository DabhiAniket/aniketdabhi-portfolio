const Avatar = ({ className = "hidden xl:flex xl:max-w-none", priority = false }) => {
  return (
    <div className={`${className} pointer-events-none select-none`}>
      <img
        src="/myavatar.webp"
        srcSet="/myavatar-640.webp 640w, /myavatar.webp 1254w"
        sizes="(min-width: 1200px) 737px, (min-width: 640px) 420px, 320px"
        alt="Aniket Dabhi – Full-Stack Software Developer"
        width={737}
        height={737}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        className="translate-z-0 w-full h-full object-contain"
      />
    </div>
  );
};

export default Avatar;
