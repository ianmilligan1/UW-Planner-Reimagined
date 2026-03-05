export default function Header() {
  return (
    <header className="bg-uw-black px-6 md:px-10 flex items-center justify-between h-16">
      <div className="flex items-center gap-3.5">
        <div className="w-[34px] h-[34px] rounded-lg bg-uw-gold flex items-center justify-center font-heading font-bold text-lg text-uw-black">
          W
        </div>
        <span className="text-white font-semibold text-base tracking-tight">
          UW Planner
        </span>
        <span className="text-gray-500 text-[13px] ml-1">Annual Plan</span>
      </div>
      <div className="flex items-center gap-5">
        <span className="text-gray-400 text-[13px] hidden sm:inline">VPRI-RO&I</span>
        <div className="w-[34px] h-[34px] rounded-full bg-gray-700 flex items-center justify-center text-uw-gold font-bold text-sm">
          IM
        </div>
      </div>
    </header>
  );
}
