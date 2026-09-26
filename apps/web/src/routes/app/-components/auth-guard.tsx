import { Navigate } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'

import { useProfile } from '../../../hooks/use-profile'

export function AuthGuard({ children }: PropsWithChildren) {
    const { data: profile } = useProfile()

    if (!profile) {
        return <Navigate to="/" replace />
    }

    return children
}
