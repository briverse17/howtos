import logo from '../../../logo.svg';

export function Bottom() {
  return (
    <footer className="bg-slate-400 bottom-8 inset-x-0 flex items-center justify-center max-h-8 md:max-h-12">
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
    </footer>
  );
}
