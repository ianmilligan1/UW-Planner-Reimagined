import { useState } from "react";
import SlideOver from "../common/SlideOver";
import Field from "../common/Field";
import { STATUS_COLORS, UNITS, OBJECTIVES } from "../../constants";

const inputClass =
  "border-[1.5px] border-gray-200 rounded-[10px] py-2.5 px-3.5 text-sm font-sans outline-none transition-colors bg-[#FAFAFA] w-full";

export default function InitiativeForm({ initiative, onSave, onClose }) {
  const isEdit = !!initiative;
  const [form, setForm] = useState(
    initiative || {
      title: "",
      objective: "Financial Sustainability",
      unit: "VPRI-RO&I",
      collaboratingUnit: "",
      endYear: "2026/27",
      status: "Not Started",
      milestoneProgress: 0,
      description: "",
      milestones: [{ year: "2025/26", text: "", done: false }],
    }
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const addMilestone = () =>
    setForm((f) => ({
      ...f,
      milestones: [...f.milestones, { year: "2026/27", text: "", done: false }],
    }));

  const updateMilestone = (i, k, v) =>
    setForm((f) => ({
      ...f,
      milestones: f.milestones.map((m, j) => (j === i ? { ...m, [k]: v } : m)),
    }));

  const removeMilestone = (i) =>
    setForm((f) => ({ ...f, milestones: f.milestones.filter((_, j) => j !== i) }));

  return (
    <SlideOver onClose={onClose}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900 m-0">
          {isEdit ? "Edit Initiative" : "Create Initiative"}
        </h2>
        <button
          onClick={onClose}
          className="bg-transparent border-none text-[22px] cursor-pointer text-gray-500 p-1"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <Field label="Initiative Title">
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Implement campus-wide RDM strategy"
            className={inputClass}
          />
        </Field>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            placeholder="Brief description of the initiative..."
            className={`${inputClass} resize-y min-h-[72px]`}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Objective">
            <select
              value={form.objective}
              onChange={(e) => set("objective", e.target.value)}
              className={inputClass}
            >
              {OBJECTIVES.filter((o) => o !== "All").map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
              className={inputClass}
            >
              {Object.keys(STATUS_COLORS).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Unit Responsible">
            <select
              value={form.unit}
              onChange={(e) => set("unit", e.target.value)}
              className={inputClass}
            >
              {UNITS.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </Field>
          <Field label="Collaborating Unit">
            <select
              value={form.collaboratingUnit}
              onChange={(e) => set("collaboratingUnit", e.target.value)}
              className={inputClass}
            >
              <option value="">None</option>
              {UNITS.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="End Year">
            <select
              value={form.endYear}
              onChange={(e) => set("endYear", e.target.value)}
              className={inputClass}
            >
              <option>2024/25</option>
              <option>2025/26</option>
              <option>2026/27</option>
              <option>2027/28</option>
              <option>2028/29</option>
            </select>
          </Field>
          <Field label="Milestone Progress (%)">
            <input
              type="number"
              min={0}
              max={100}
              value={form.milestoneProgress}
              onChange={(e) => set("milestoneProgress", Number(e.target.value))}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Milestones */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <span className="font-semibold text-sm text-gray-700">Milestones</span>
            <button
              onClick={addMilestone}
              className="border-[1.5px] border-gray-200 rounded-lg py-1 px-3 text-[13px] font-sans cursor-pointer bg-white text-gray-700 font-medium"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {form.milestones.map((m, i) => (
              <div
                key={i}
                className="grid items-center gap-2"
                style={{ gridTemplateColumns: "100px 1fr 36px 36px" }}
              >
                <select
                  value={m.year}
                  onChange={(e) => updateMilestone(i, "year", e.target.value)}
                  className={`${inputClass} !text-[13px] !py-1.5 !px-2`}
                >
                  <option>2024/25</option>
                  <option>2025/26</option>
                  <option>2026/27</option>
                  <option>2027/28</option>
                </select>
                <input
                  value={m.text}
                  onChange={(e) => updateMilestone(i, "text", e.target.value)}
                  placeholder="Milestone description"
                  className={`${inputClass} !text-[13px] !py-1.5 !px-2.5`}
                />
                <button
                  onClick={() => updateMilestone(i, "done", !m.done)}
                  title={m.done ? "Mark incomplete" : "Mark complete"}
                  className="w-8 h-8 rounded-lg border-none cursor-pointer text-base flex items-center justify-center"
                  style={{
                    background: m.done ? "#DCFCE7" : "#F3F4F6",
                  }}
                >
                  {m.done ? "✓" : "○"}
                </button>
                <button
                  onClick={() => removeMilestone(i)}
                  className="w-8 h-8 rounded-lg border-none cursor-pointer text-sm flex items-center justify-center"
                  style={{ background: "#FEE2E2", color: "#991B1B" }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-9 justify-end">
        <button
          onClick={onClose}
          className="border-none rounded-[10px] px-6 py-2.5 text-sm font-sans font-medium cursor-pointer bg-gray-100 text-gray-700 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (!form.title.trim()) return;
            onSave({ ...form, id: form.id || Date.now() });
          }}
          className="border-none rounded-[10px] px-6 py-2.5 text-sm font-sans font-semibold cursor-pointer bg-uw-gold text-uw-black transition-all"
        >
          {isEdit ? "Save Changes" : "Create Initiative"}
        </button>
      </div>
    </SlideOver>
  );
}
