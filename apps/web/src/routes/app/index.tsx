import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'

import { getProfile } from '../../http/profile'

export const Route = createFileRoute('/app/')({
    component: AppPage,
})

function AppPage() {
    const { data } = useSuspenseQuery({
        queryKey: ['profile'],
        queryFn: () =>
            getProfile().catch((error) => {
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 401
                ) {
                    return null
                }

                return Promise.reject(error)
            }),
    })

    const firstName = data!.user.name.trim().split(/\s+/)[0]

    return (
        <main className="px-6 pt-12 pb-8 sm:px-8 sm:pt-24 sm:pb-12">
            <section className="mx-auto w-full max-w-130">
                <span
                    aria-hidden="true"
                    className="grid h-8 w-8 place-items-center rounded-full bg-brand-500 text-on-brand"
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
                        <path d="M6.5 12.5l3.5 3.5 7.5-8" />
                    </svg>
                </span>

                <h1 className="mt-6 text-[32px] leading-9.5 font-semibold tracking-[-0.02em] text-text sm:text-[40px] sm:leading-11">
                    Autenticação concluída.
                </h1>

                <p className="mt-8 text-[22px] leading-7.5 font-medium tracking-[-0.01em] text-text-muted">
                    Olá,{' '}
                    <strong className="font-semibold text-text">
                        {firstName}
                    </strong>
                    .
                </p>

                <p className="mt-3 max-w-110 text-body text-text-muted">
                    Obrigado por dedicar um pouco do seu tempo para testar o
                    AuthLab e fazer parte deste experimento.
                </p>

                <p className="mt-4 max-w-110 text-body text-text-muted">
                    Sua sessão já está ativa. Abra as DevTools do navegador em
                    Application → Cookies e você poderá ver o cookie{' '}
                    <code>auth_session</code> marcado como <code>HttpOnly</code>
                    .
                </p>

                <div className="mt-12">
                    <p className="flex items-center gap-2.5 text-sm font-medium text-text">
                        <span
                            aria-hidden="true"
                            className="h-2 w-2 flex-none rounded-full bg-brand-500 shadow-[0_0_0_3px_var(--glow)]"
                        />
                        Sessão ativa
                    </p>
                    <p className="mt-0.5 pl-4.5 text-[13px] text-text-muted">
                        Autenticação protegida por cookie HttpOnly.
                    </p>
                </div>
            </section>
        </main>
    )
}
