import labLogo from '../assets/lab-logo.svg'
import { useProfile } from '../hooks/use-profile'

import { LogoutButton } from './logout-button'

export function Header() {
    const { data: profile } = useProfile()

    return (
        <header className="flex h-16 items-center justify-between px-6 sm:px-8">
            <div className="flex min-w-0 items-center gap-3">
                <img
                    src={labLogo}
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-auto"
                />
                <span className="text-[16px] leading-6 font-semibold text-text">
                    AuthLab
                </span>
                <span className="hidden font-mono text-xs leading-4 font-medium text-text-muted min-[380px]:inline">
                    Experimento de autenticação
                </span>
            </div>

            {profile ? <LogoutButton /> : null}
        </header>
    )
}
