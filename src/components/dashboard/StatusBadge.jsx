import { STATUS_COLORS } from "../../constants";

export default function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS["Not Started"];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full text-[13px] font-medium whitespace-nowrap"
      style={{ padding: "4px 12px", background: c.bg, color: c.text }}
    >
      <span
        className="w-[7px] h-[7px] rounded-full shrink-0"
        style={{ background: c.dot }}
      />
      {status}
    </span>
  );
}
