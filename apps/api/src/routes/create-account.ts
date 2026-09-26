import bcrypt from 'bcryptjs'
import { Router } from 'express'
import { Prisma } from '../generated/prisma/client.js'
import { z } from 'zod'

import { AUTH_COOKIE_NAME, authCookieOptions } from '../lib/auth-cookie.js'
import { createAuthToken } from '../lib/auth-token.js'
import { prisma } from '../lib/prisma.js'

const createAccountSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(8).max(72),
})

export const createAccountRouter = Router()

createAccountRouter.post('/auth/create-account', async (request, response) => {
    const result = createAccountSchema.safeParse(request.body)

    if (!result.success) {
        return response.status(400).json({
            message: 'Invalid data',
            errors: result.error.flatten().fieldErrors,
        })
    }

    const { name, email, password } = result.data

    const userAlreadyExists = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (userAlreadyExists) {
        return response.status(409).json({
            message: 'Email already in use',
        })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    })

    const token = createAuthToken(user.id)

    response.cookie(AUTH_COOKIE_NAME, token, authCookieOptions)

    return response.status(201).json({
        user,
    })
})
