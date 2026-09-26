import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { profileQueryKey } from '../hooks/use-profile'
import { logout } from '../http/logout'

import { Button } from './ui/button'

export function LogoutButton() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            await queryClient.cancelQueries({
                queryKey: profileQueryKey,
                exact: true,
            })

            queryClient.setQueryData(profileQueryKey, null)

            queryClient.removeQueries({
                queryKey: profileQueryKey,
                exact: true,
            })

            navigate({ to: '/' })
        },
    })

    return (
        <Button
            type="button"
            variant="secondary"
            disabled={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate()}
        >
            Sair
        </Button>
    )
}
