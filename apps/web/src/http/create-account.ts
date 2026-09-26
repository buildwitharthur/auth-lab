import { api } from '../lib/api'

export interface CreateAccountRequest {
    name: string
    email: string
    password: string
}

export interface CreateAccountResponse {
    user: User
}

export async function createAccount(
    data: CreateAccountRequest,
): Promise<CreateAccountResponse> {
    const response = await api.post<CreateAccountResponse>(
        '/auth/create-account',
        data,
    )

    return response.data
}
