import { useSuspenseQuery } from '@tanstack/react-query'
import { Navigate } from '@tanstack/react-router'
import axios from 'axios'
import type { PropsWithChildren } from 'react'

import { getProfile } from '../../../http/profile'

export function AuthGuard({ children }: PropsWithChildren) {
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

    if (!data) {
        return <Navigate to="/" replace />
    }

    return children
}
