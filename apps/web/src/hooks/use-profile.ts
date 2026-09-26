import { useSuspenseQuery } from '@tanstack/react-query'
import axios from 'axios'

import { getProfile } from '../http/profile'

export const profileQueryKey = ['profile'] as const

export function useProfile() {
    return useSuspenseQuery({
        queryKey: profileQueryKey,
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
}
