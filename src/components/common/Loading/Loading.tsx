export function Loading() {
  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  role="status"
  aria-live="polite"
>
  <div className="flex items-center space-x-3 bg-white/10 px-4 py-3 rounded-xl backdrop-blur-sm shadow-lg">
    <div className="h-7 w-7 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    <span className="text-white text-base font-semibold tracking-wide">
      Carregando...
    </span>
  </div>
</div>

  );
}
