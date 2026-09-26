import labLogo from '../assets/lab-logo.svg'

export function Footer() {
    return (
        <footer className="flex justify-center pt-6 pb-8">
            <a
                href="https://arthurlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] leading-5 text-text-muted opacity-75 transition-opacity hover:opacity-100"
            >
                <img src={labLogo} alt="" aria-hidden="true" className="h-4.5 w-auto" />
                <span>
                    um experimento <strong className="font-semibold">ArthurLabs</strong>
                </span>
            </a>
        </footer>
    )
}
