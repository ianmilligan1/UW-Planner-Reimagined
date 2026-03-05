export default function ProgressBar({ value, height = 6 }) {
  const color = value === 100 ? "#22C55E" : value > 50 ? "#3B82F6" : "#F59E0B";
  return (
    <div
      className="w-full rounded-full overflow-hidden"
      style={{ background: "#E5E7EB", height }}
    >
      <div
        className="h-full rounded-full transition-all duration-600"
        style={{
          width: `${value}%`,
          background: color,
          transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
}
