import jwt from 'jsonwebtoken'

function getJwtSecret(): string {
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined.')
    }

    return jwtSecret
}

const jwtSecret = getJwtSecret()

export function createAuthToken(userId: string) {
    return jwt.sign({}, jwtSecret, {
        subject: userId,
        expiresIn: '7d',
        algorithm: 'HS256',
    })
}

export function verifyAuthToken(token: string) {
    return jwt.verify(token, jwtSecret, {
        algorithms: ['HS256'],
    })
}
