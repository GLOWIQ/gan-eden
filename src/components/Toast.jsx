export default function Toast({ name }) {
  return (
    <div
      dir="rtl"
      className="fixed top-20 left-4 z-[100] bg-primary text-white font-body font-medium px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-toast pointer-events-none"
    >
      <svg className="w-4 h-4 text-green-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      <span><span className="font-bold">{name}</span> נוסף לעגלה</span>
    </div>
  )
}
