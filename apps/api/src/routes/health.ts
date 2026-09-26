import { Router } from 'express'

export const healthRouter = Router()

healthRouter.get('/health', (_, response) => {
    return response.status(200).json({
        ok: true,
    })
})
