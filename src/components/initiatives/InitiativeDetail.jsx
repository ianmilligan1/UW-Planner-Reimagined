import SlideOver from "../common/SlideOver";
import StatusBadge from "../dashboard/StatusBadge";
import ProgressBar from "../dashboard/ProgressBar";

function InfoBlock({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-[10px] p-3 px-4">
      <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-sm font-medium text-gray-900">{value}</div>
    </div>
  );
}

export default function InitiativeDetail({ initiative, onClose, onEdit }) {
  if (!initiative) return null;

  return (
    <SlideOver onClose={onClose}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="mb-2.5">
            <StatusBadge status={initiative.status} />
          </div>
          <h2 className="font-heading text-[22px] font-bold text-gray-900 m-0 leading-snug">
            {initiative.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="bg-transparent border-none text-[22px] cursor-pointer text-gray-500 p-1 ml-3"
        >
          ✕
        </button>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed my-3 mb-7">
        {initiative.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-7">
        <InfoBlock label="Objective" value={initiative.objective} />
        <InfoBlock label="Unit" value={initiative.unit} />
        <InfoBlock label="Collaborating Unit" value={initiative.collaboratingUnit || "—"} />
        <InfoBlock label="End Year" value={initiative.endYear} />
      </div>

      <div className="mb-7">
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-sm text-gray-700">Overall Progress</span>
          <span className="font-semibold text-sm text-gray-700">
            {initiative.milestoneProgress}%
          </span>
        </div>
        <ProgressBar value={initiative.milestoneProgress} height={10} />
      </div>

      <div>
        <span className="font-semibold text-sm text-gray-700 block mb-3">Milestones</span>
        <div className="flex flex-col">
          {initiative.milestones.map((m, i) => (
            <div
              key={i}
              className="flex gap-3.5 items-start relative pb-5"
            >
              {/* Vertical connector line */}
              {i < initiative.milestones.length - 1 && (
                <div
                  className="absolute w-0.5"
                  style={{
                    left: 11,
                    top: 24,
                    bottom: 0,
                    background: m.done ? "#22C55E" : "#E5E7EB",
                  }}
                />
              )}
              {/* Circle */}
              <div
                className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold"
                style={{
                  background: m.done ? "#DCFCE7" : "#F3F4F6",
                  color: m.done ? "#166534" : "#9CA3AF",
                  border: m.done ? "2px solid #22C55E" : "2px solid #D1D5DB",
                }}
              >
                {m.done ? "✓" : i + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{m.text}</div>
                <div className="text-xs text-gray-400 mt-0.5">{m.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-8 justify-end">
        <button
          onClick={onClose}
          className="border-none rounded-[10px] px-6 py-2.5 text-sm font-sans font-medium cursor-pointer bg-gray-100 text-gray-700 transition-all"
        >
          Close
        </button>
        <button
          onClick={() => onEdit(initiative)}
          className="border-none rounded-[10px] px-6 py-2.5 text-sm font-sans font-semibold cursor-pointer bg-uw-gold text-uw-black transition-all"
        >
          Edit Initiative
        </button>
      </div>
    </SlideOver>
  );
}
