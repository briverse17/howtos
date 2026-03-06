export function Top() {
  return (
    <header className="bg-foreground text-background border-b-8 border-foreground top-0 inset-x-0 flex items-center justify-between px-6 py-4 md:py-6 relative overflow-hidden z-10 w-full shrink-0">
      <div className="absolute inset-0 bg-foreground mix-blend-difference pointer-events-none"></div>
      <a
        href="https://github.com/briverse17"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block transition-all hover:-translate-y-1 hover:text-accent z-10"
      >
        <span className="font-mono text-xl font-extrabold uppercase tracking-tighter">
          /BRIVERSE17
        </span>
      </a>
      <span className="font-mono font-black text-2xl md:text-5xl uppercase tracking-widest text-accent z-10 drop-shadow-[4px_4px_0_rgba(255,255,255,1)] dark:drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:scale-105 transition-transform cursor-pointer">
        HOW TO {"{...}"}
      </span>
      <a
        href="https://github.com/briverse17/howtos/tree/content"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:rotate-[15deg] hover:scale-110 z-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/howtos/logo.svg"
          className="h-10 md:h-16 pointer-events-auto"
          alt="Repo"
        />
      </a>
    </header>
  );
}
