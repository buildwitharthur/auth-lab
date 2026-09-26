import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
    return (
        <main className="flex flex-1 items-center justify-center px-6 py-12">
            <section className="w-full max-w-[520px] text-center">
                <span className="font-mono text-[13px] tracking-[0.04em] text-brand-500">
                    404
                </span>

                <h1 className="mt-3 text-[32px] leading-10 font-semibold text-text">
                    Página não encontrada.
                </h1>

                <p className="mt-3 text-base text-text-muted">
                    Essa página não existe ou foi movida.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-block font-medium text-brand-500 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
                >
                    Voltar ao início
                </Link>
            </section>
        </main>
    )
}
