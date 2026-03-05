export default function StatCard({ label, value, color, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-[14px] text-left cursor-pointer flex-1 min-w-[120px] transition-all duration-200"
      style={{
        border: active ? `2px solid ${color}` : "2px solid transparent",
        background: active ? `${color}11` : "#fff",
        padding: "18px 22px",
        boxShadow: active ? `0 0 0 3px ${color}22` : "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="text-[32px] font-bold font-heading"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-[13px] text-gray-500 mt-1 font-medium">{label}</div>
    </button>
  );
}
