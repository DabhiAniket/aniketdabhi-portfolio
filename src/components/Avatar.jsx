const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none pointer-events-none select-none">
      <img
        src="/myavatar.png"
        alt="avatar"
        width={737}
        height={678}
        className="translate-z-0 w-full h-full object-contain"
      />
    </div>
  );
};

export default Avatar;
