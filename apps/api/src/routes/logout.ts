import { Router } from 'express'

import { AUTH_COOKIE_NAME, authCookieClearOptions } from '../lib/auth-cookie.js'

export const logoutRouter = Router()

logoutRouter.post('/auth/logout', (_, response) => {
    response.clearCookie(AUTH_COOKIE_NAME, authCookieClearOptions)

    return response.status(204).send()
})
