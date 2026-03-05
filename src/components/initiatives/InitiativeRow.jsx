import StatusBadge from "../dashboard/StatusBadge";
import ProgressBar from "../dashboard/ProgressBar";

export default function InitiativeRow({ initiative, onView, onDelete, isLast }) {
  return (
    <>
      {/* Desktop row */}
      <div
        onClick={() => onView(initiative)}
        className="hidden md:grid cursor-pointer transition-colors hover:bg-[#FAFAF8]"
        style={{
          gridTemplateColumns: "2.5fr 1.2fr 1fr 0.8fr 140px 60px",
          padding: "16px 24px",
          borderBottom: isLast ? "none" : "1px solid #F3F4F6",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div>
          <div className="font-medium text-sm text-gray-900 leading-snug">
            {initiative.title}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{initiative.objective}</div>
        </div>
        <div className="text-[13px] text-gray-500">{initiative.unit}</div>
        <div className="text-[13px] text-gray-500">{initiative.endYear}</div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <ProgressBar value={initiative.milestoneProgress} />
          </div>
          <span className="text-xs text-gray-500 font-medium min-w-[32px] text-right">
            {initiative.milestoneProgress}%
          </span>
        </div>
        <StatusBadge status={initiative.status} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(initiative);
          }}
          title="Delete"
          className="bg-transparent border-none cursor-pointer text-gray-300 text-base p-1 rounded-md transition-colors hover:text-red-500"
        >
          🗑
        </button>
      </div>

      {/* Mobile card */}
      <div
        onClick={() => onView(initiative)}
        className="md:hidden cursor-pointer p-4 transition-colors hover:bg-[#FAFAF8]"
        style={{ borderBottom: isLast ? "none" : "1px solid #F3F4F6" }}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 pr-2">
            <div className="font-medium text-sm text-gray-900 leading-snug">
              {initiative.title}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{initiative.objective}</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(initiative);
            }}
            className="bg-transparent border-none cursor-pointer text-gray-300 text-base p-1 rounded-md transition-colors hover:text-red-500 shrink-0"
          >
            🗑
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <StatusBadge status={initiative.status} />
          <span className="text-xs text-gray-500">{initiative.unit}</span>
          <span className="text-xs text-gray-500">{initiative.endYear}</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1">
            <ProgressBar value={initiative.milestoneProgress} />
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {initiative.milestoneProgress}%
          </span>
        </div>
      </div>
    </>
  );
}
