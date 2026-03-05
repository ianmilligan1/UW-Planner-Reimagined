export default function SlideOver({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",
          animation: "fadeIn 0.2s",
        }}
      />
      {/* Panel */}
      <div
        className="relative bg-white h-full overflow-y-auto"
        style={{
          width: "min(560px, 90vw)",
          boxShadow: "-8px 0 30px rgba(0,0,0,0.12)",
          animation: "slideIn 0.3s cubic-bezier(.4,0,.2,1)",
          padding: "36px 32px 48px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
