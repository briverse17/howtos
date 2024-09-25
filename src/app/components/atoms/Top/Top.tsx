export function Top() {
  return (
    <header className="bg-slate-800 top-0 inset-x-0 flex flex-1 items-center justify-between md:justify-around px-4 max-h-8 md:max-h-12">
      <a
        href="https://github.com/briverse17"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block"
      >
        <span className="my-1 leading-6 md:my-2 md:leading-8 text-white font-mono md:text-md">
          <code>/briverse17</code>
        </span>
      </a>
      <span className="my-1 leading-6 md:my-2 md:leading-8 text-white font-mono font-bold text-md md:text-2xl">
        How to {"{...}"}
      </span>
      <a
        href="https://github.com/briverse17/howtos/tree/content"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/logo.svg" // {logo}
          className="my-1 h-6 md:my-2 md:h-8 pointer-events-auto motion-safe:animate-logoSpin"
          alt="https://github.com/briverse17/howtos/tree/content"
        />
      </a>
    </header>
  );
}
