import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { Button } from './ui/button'

interface ErrorPageProps {
    error: unknown
    reset: () => void
}

export function ErrorPage({ reset }: ErrorPageProps) {
    const router = useRouter()
    const queryErrorResetBoundary = useQueryErrorResetBoundary()

    useEffect(() => {
        queryErrorResetBoundary.reset()
    }, [queryErrorResetBoundary])

    function handleRetry() {
        queryErrorResetBoundary.reset()
        reset()
        router.invalidate()
    }

    return (
        <main className="flex flex-1 items-center justify-center px-6 py-12">
            <section className="w-full max-w-[520px] text-center">
                <span
                    aria-hidden="true"
                    className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-danger text-on-brand"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 8v5M12 16.5v.01" />
                        <circle cx="12" cy="12" r="9" />
                    </svg>
                </span>

                <h1 role="alert" className="mt-6 text-[32px] leading-10 font-semibold text-text">
                    Algo deu errado.
                </h1>

                <p className="mt-3 text-base text-text-muted">
                    Não foi possível carregar esta página. Tente novamente.
                </p>

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button type="button" onClick={handleRetry}>
                        Tentar novamente
                    </Button>

                    <Link
                        to="/"
                        className="font-medium text-brand-500 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
                    >
                        Voltar ao início
                    </Link>
                </div>
            </section>
        </main>
    )
}
