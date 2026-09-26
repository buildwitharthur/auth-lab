import { Router } from 'express'

import { AUTH_COOKIE_NAME, authCookieClearOptions } from '../lib/auth-cookie.js'
import { prisma } from '../lib/prisma.js'
import { authMiddleware } from '../middlewares/auth.js'

export const profileRouter = Router()

profileRouter.get(
    '/auth/profile',
    authMiddleware,
    async (request, response) => {
        const userId = request.userId

        if (!userId) {
            return response.status(401).json({
                message: 'Unauthorized',
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        })

        if (!user) {
            response.clearCookie(AUTH_COOKIE_NAME, authCookieClearOptions)

            return response.status(401).json({
                message: 'Unauthorized',
            })
        }

        return response.status(200).json({
            user,
        })
    },
)
