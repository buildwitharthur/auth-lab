import { api } from '../lib/api'

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    user: User
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data)

    return response.data
}
