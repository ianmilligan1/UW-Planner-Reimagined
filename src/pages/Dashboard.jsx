import { useState, useCallback, useEffect } from "react";
import { useInitiatives } from "../hooks/useInitiatives";
import { OBJECTIVES } from "../constants";
import StatCard from "../components/dashboard/StatCard";
import InitiativeTable from "../components/initiatives/InitiativeTable";
import InitiativeDetail from "../components/initiatives/InitiativeDetail";
import InitiativeForm from "../components/initiatives/InitiativeForm";

// ─── Toast System ───

function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[2000] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto rounded-xl px-5 py-3 text-sm font-medium text-white shadow-lg"
          style={{
            background: t.type === "success" ? "#22C55E" : t.type === "info" ? "#3B82F6" : "#EF4444",
            animation: t.removing ? "toastOut 0.3s forwards" : "toastIn 0.3s",
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── Confirm Dialog ───

function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)", animation: "fadeIn 0.2s" }}
        onClick={onCancel}
      />
      <div
        className="relative bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full mx-4"
        style={{ animation: "riseUp 0.2s" }}
      >
        <h3 className="font-heading text-lg font-bold text-gray-900 m-0 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 m-0 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="border-none rounded-[10px] px-5 py-2.5 text-sm font-sans font-medium cursor-pointer bg-gray-100 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="border-none rounded-[10px] px-5 py-2.5 text-sm font-sans font-semibold cursor-pointer bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CSV Export ───

function exportCSV(initiatives) {
  const headers = ["Title", "Objective", "Unit", "Collaborating Unit", "End Year", "Status", "Progress (%)"];
  const escape = (val) => {
    const s = String(val ?? "");
    return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = initiatives.map((i) =>
    [i.title, i.objective, i.unit, i.collaboratingUnit, i.endYear, i.status, i.milestoneProgress].map(escape).join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "initiatives.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Dashboard Page ───

export default function Dashboard() {
  const { initiatives, addInitiative, updateInitiative, deleteInitiative } = useInitiatives();

  const [filterStatus, setFilterStatus] = useState(null);
  const [filterObjective, setFilterObjective] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editInit, setEditInit] = useState(null);
  const [viewInit, setViewInit] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Toast helper
  const toast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, removing: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, removing: true } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  // Counts
  const counts = {
    total: initiatives.length,
    completed: initiatives.filter((i) => i.status === "Completed").length,
    onTrack: initiatives.filter((i) => i.status === "On Track").length,
    delayed: initiatives.filter((i) => i.status === "Delayed").length,
    atRisk: initiatives.filter((i) => i.status === "At Risk").length,
    notStarted: initiatives.filter((i) => i.status === "Not Started").length,
  };

  // Filtering
  const filtered = initiatives.filter((i) => {
    if (filterStatus && i.status !== filterStatus) return false;
    if (filterObjective !== "All" && i.objective !== filterObjective) return false;
    if (search && !i.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Handlers
  const handleSave = (form) => {
    if (editInit) {
      updateInitiative(form);
      toast("Initiative updated", "info");
    } else {
      addInitiative(form);
      toast("Initiative created", "success");
    }
    setShowForm(false);
    setEditInit(null);
  };

  const handleDeleteRequest = (initiative) => {
    setDeleteTarget(initiative);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteInitiative(deleteTarget.id);
      toast("Initiative deleted", "error");
      setViewInit(null);
    }
    setDeleteTarget(null);
  };

  const openEdit = (init) => {
    setViewInit(null);
    setEditInit(init);
    setShowForm(true);
  };

  const inputClass =
    "border-[1.5px] border-gray-200 rounded-[10px] py-2.5 px-3.5 text-sm font-sans outline-none transition-colors bg-white w-full";

  return (
    <main className="max-w-[1140px] mx-auto px-6 pt-8 pb-16">
      {/* Title row */}
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-end mb-7 gap-4"
        style={{ animation: loaded ? "riseUp 0.5s ease" : "none" }}
      >
        <div>
          <h1 className="font-heading text-3xl font-bold m-0 text-gray-900 tracking-tight">
            Annual Plan
          </h1>
          <p className="m-0 mt-1.5 text-gray-500 text-sm">
            {initiatives.length} initiatives · VPRI Research Oversight & Integrity
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => exportCSV(initiatives)}
            className="border-[1.5px] border-gray-200 rounded-[10px] py-3 px-5 text-sm font-sans cursor-pointer bg-white text-gray-700 font-medium flex items-center gap-2 transition-all"
          >
            <span className="text-base">↓</span>
            Export CSV
          </button>
          <button
            onClick={() => {
              setEditInit(null);
              setShowForm(true);
            }}
            className="border-none rounded-[10px] py-3 px-6 text-sm font-sans font-semibold cursor-pointer bg-uw-gold text-uw-black flex items-center gap-2 transition-all"
            style={{ boxShadow: "0 2px 8px rgba(255,213,79,0.35)" }}
          >
            <span className="text-lg leading-none">+</span>
            New Initiative
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div
        className="flex gap-3.5 mb-7 flex-wrap"
        style={{ animation: loaded ? "riseUp 0.5s ease 0.05s both" : "none" }}
      >
        <StatCard
          label="Total"
          value={counts.total}
          color="#374151"
          active={!filterStatus}
          onClick={() => setFilterStatus(null)}
        />
        <StatCard
          label="Completed"
          value={counts.completed}
          color="#3B82F6"
          active={filterStatus === "Completed"}
          onClick={() => setFilterStatus(filterStatus === "Completed" ? null : "Completed")}
        />
        <StatCard
          label="On Track"
          value={counts.onTrack}
          color="#22C55E"
          active={filterStatus === "On Track"}
          onClick={() => setFilterStatus(filterStatus === "On Track" ? null : "On Track")}
        />
        <StatCard
          label="Delayed"
          value={counts.delayed}
          color="#F59E0B"
          active={filterStatus === "Delayed"}
          onClick={() => setFilterStatus(filterStatus === "Delayed" ? null : "Delayed")}
        />
        <StatCard
          label="Not Started"
          value={counts.notStarted}
          color="#9CA3AF"
          active={filterStatus === "Not Started"}
          onClick={() => setFilterStatus(filterStatus === "Not Started" ? null : "Not Started")}
        />
      </div>

      {/* Filters row */}
      <div
        className="flex gap-3 mb-5 flex-wrap items-center"
        style={{ animation: loaded ? "riseUp 0.5s ease 0.1s both" : "none" }}
      >
        <div className="relative flex-1 min-w-[220px]">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base">
            ⌕
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search initiatives..."
            className={`${inputClass} !pl-9`}
          />
        </div>
        <select
          value={filterObjective}
          onChange={(e) => setFilterObjective(e.target.value)}
          className={`${inputClass} !w-auto min-w-[180px]`}
        >
          {OBJECTIVES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        {(filterStatus || filterObjective !== "All" || search) && (
          <button
            onClick={() => {
              setFilterStatus(null);
              setFilterObjective("All");
              setSearch("");
            }}
            className="border-[1.5px] border-red-200 rounded-lg py-1 px-3 text-[13px] font-sans cursor-pointer bg-white text-red-500 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ animation: loaded ? "riseUp 0.5s ease 0.15s both" : "none" }}>
        <InitiativeTable
          initiatives={filtered}
          onView={setViewInit}
          onDelete={handleDeleteRequest}
        />
      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-gray-300 text-xs">
        UW Planner Reimagined · Built with Claude · University of Waterloo
      </div>

      {/* Panels */}
      {showForm && (
        <InitiativeForm
          initiative={editInit}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditInit(null);
          }}
        />
      )}
      {viewInit && (
        <InitiativeDetail
          initiative={viewInit}
          onClose={() => setViewInit(null)}
          onEdit={openEdit}
        />
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete Initiative"
          message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Toasts */}
      <ToastContainer toasts={toasts} />
    </main>
  );
}
