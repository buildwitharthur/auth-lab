import bcrypt from 'bcryptjs'
import { Router } from 'express'
import { z } from 'zod'

import { AUTH_COOKIE_NAME, authCookieOptions } from '../lib/auth-cookie.js'
import { createAuthToken } from '../lib/auth-token.js'
import { prisma } from '../lib/prisma.js'

const loginSchema = z.object({
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(1),
})

export const loginRouter = Router()

loginRouter.post('/auth/login', async (request, response) => {
    const result = loginSchema.safeParse(request.body)

    if (!result.success) {
        return response.status(400).json({
            message: 'Invalid data',
            errors: result.error.flatten().fieldErrors,
        })
    }

    const { email, password } = result.data

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (!user) {
        return response.status(401).json({
            message: 'Invalid credentials',
        })
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatches) {
        return response.status(401).json({
            message: 'Invalid credentials',
        })
    }

    const token = createAuthToken(user.id)

    response.cookie(AUTH_COOKIE_NAME, token, authCookieOptions)

    return response.status(200)
})
