
const Circles = () => {
  return (
    <div className="w-50 xl:w-75 absolute -right-16 -bottom-2 mix-blend-color-dodge animate-pulse duration-75 z-10 pointer-events-none select-none">
      <img
        src="/circles.webp"
        loading="lazy"
        decoding="async"
        alt="circles"
        width={260}
        height={200}
        className="w-full h-full"
      />
    </div>
  );
};

export default Circles;
