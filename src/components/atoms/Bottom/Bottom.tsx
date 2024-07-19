import logo from "../../../logo.svg"

export function Bottom() {
    return (
        <footer className="bg-slate-400 fixed inset-x-0 bottom-0 flex items-center justify-center h-10">
            <a
                href="https://github.com/briverse17/howtos/tree/content"
                target="_blank"
                rel="noopener noreferrer"
            ><img
                    src={logo}
                    className="h-8 my-2 pointer-events-auto motion-safe:animate-logoSpin"
                    alt="logo"
                />
            </a>
        </footer>
    )
}
