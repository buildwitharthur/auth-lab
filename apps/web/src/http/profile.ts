import { api } from '../lib/api'


export interface ProfileResponse {
    user: User
}

export async function getProfile(): Promise<ProfileResponse> {
    const response = await api.get<ProfileResponse>('/auth/profile')

    return response.data
}
