import type { RequestHandler } from 'express'

import { AUTH_COOKIE_NAME } from '../lib/auth-cookie.js'
import { verifyAuthToken } from '../lib/auth-token.js'

export const authMiddleware: RequestHandler = (request, response, next) => {
    const token = request.cookies[AUTH_COOKIE_NAME]

    if (typeof token !== 'string' || token.length === 0) {
        return response.status(401).json({
            message: 'Unauthorized',
        })
    }

    try {
        const payload = verifyAuthToken(token)

        if (
            typeof payload !== 'object' ||
            payload === null ||
            typeof payload.sub !== 'string' ||
            payload.sub.trim().length === 0
        ) {
            return response.status(401).json({
                message: 'Unauthorized',
            })
        }

        request.userId = payload.sub
    } catch {
        return response.status(401).json({
            message: 'Unauthorized',
        })
    }

    next()
}
