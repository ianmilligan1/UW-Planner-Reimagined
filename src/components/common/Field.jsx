export default function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-semibold text-[13px] text-gray-700">{label}</span>
      {children}
    </label>
  );
}
