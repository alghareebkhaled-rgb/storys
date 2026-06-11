// Decorative sky: glowing sun + drifting clouds. Pure CSS, no JS needed.
export default function SkyBackground() {
  const rays = Array.from({ length: 12 });

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Glowing sun with slowly spinning rays */}
      <div className="absolute right-8 top-8 h-24 w-24 sm:right-14 sm:top-12 sm:h-32 sm:w-32">
        <div className="absolute inset-0 animate-spin-slow">
          {rays.map((_, i) => (
            <span
              key={i}
              className="sun-ray h-10 sm:h-14"
              style={{ transform: `rotate(${i * 30}deg) translateY(38px)` }}
            />
          ))}
        </div>
        <div className="absolute inset-2 animate-sun-glow rounded-full bg-gradient-to-br from-yellow-200 via-sunshine to-amber-400" />
      </div>

      {/* Drifting clouds at different heights, sizes and speeds */}
      <div className="cloud animate-drift h-10 w-28 top-[12%]" />
      <div className="cloud animate-drift-slow h-14 w-40 top-[26%] opacity-90" style={{ animationDelay: "-25s" }} />
      <div className="cloud animate-drift h-8 w-24 top-[42%] opacity-80" style={{ animationDelay: "-12s" }} />
      <div className="cloud animate-drift-slower h-16 w-48 top-[58%] opacity-75" style={{ animationDelay: "-50s" }} />
      <div className="cloud animate-drift-slow h-9 w-28 top-[74%] opacity-70" style={{ animationDelay: "-38s" }} />
      <div className="cloud animate-drift-slower h-12 w-36 top-[88%] opacity-60" style={{ animationDelay: "-70s" }} />
    </div>
  );
}
