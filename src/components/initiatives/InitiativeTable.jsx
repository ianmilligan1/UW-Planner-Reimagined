import { useState, useMemo } from "react";
import InitiativeRow from "./InitiativeRow";

const SORT_KEYS = {
  title: (a, b) => a.title.localeCompare(b.title),
  unit: (a, b) => a.unit.localeCompare(b.unit),
  endYear: (a, b) => a.endYear.localeCompare(b.endYear),
  progress: (a, b) => a.milestoneProgress - b.milestoneProgress,
  status: (a, b) => a.status.localeCompare(b.status),
};

const COLUMNS = [
  { key: "title", label: "Initiative", col: "2.5fr" },
  { key: "unit", label: "Unit", col: "1.2fr" },
  { key: "endYear", label: "End Year", col: "1fr" },
  { key: "progress", label: "Progress", col: "0.8fr" },
  { key: "status", label: "Status", col: "140px" },
];

export default function InitiativeTable({ initiatives, onView, onDelete }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      if (sortDir === "asc") {
        setSortDir("desc");
      } else {
        setSortKey(null);
        setSortDir("asc");
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    if (!sortKey) return initiatives;
    const comparator = SORT_KEYS[sortKey];
    const list = [...initiatives].sort(comparator);
    return sortDir === "desc" ? list.reverse() : list;
  }, [initiatives, sortKey, sortDir]);

  const arrow = (key) => {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Table header — desktop only */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "2.5fr 1.2fr 1fr 0.8fr 140px 60px",
          padding: "14px 24px",
          borderBottom: "1.5px solid #E5E7EB",
          gap: 12,
        }}
      >
        {COLUMNS.map((col) => (
          <button
            key={col.key}
            onClick={() => handleSort(col.key)}
            className="bg-transparent border-none p-0 cursor-pointer text-left font-semibold text-xs text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
          >
            {col.label}
            {arrow(col.key)}
          </button>
        ))}
        <span />
      </div>

      {/* Rows */}
      {sorted.length === 0 ? (
        <div className="py-16 px-6 text-center text-gray-400">
          <div className="text-[40px] mb-3">📋</div>
          <div className="font-medium">No initiatives match your filters</div>
        </div>
      ) : (
        sorted.map((init, idx) => (
          <InitiativeRow
            key={init.id}
            initiative={init}
            onView={onView}
            onDelete={onDelete}
            isLast={idx === sorted.length - 1}
          />
        ))
      )}
    </div>
  );
}
