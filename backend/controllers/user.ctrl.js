const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// #1 Get all users

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            include: { posts: true },
        })
        res.json(users)
    } catch (error) {
        next(error)
    }
}

// #2 Post newUser

exports.signup = async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10)
            .then(async hash => {
                const newUser = await prisma.user.create({
                    email: req.body.email,
                    password: hash
                })
                res.json(newUser)
            })
    } catch (error) {
        next(error)
    }
}

// #3 Post to login

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(401).json({ error: "User unknow" })
        } else 
        bcrypt.compare(password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Wrong password !' });
                }
                res.status(200).json({
                    user: email,
                    token: jwt.sign(
                        { user: email },
                        process.env.AUTH_KEY,
                        { expireIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({error: 'Ca ne marche pas !'}));
    } catch (error) {
        next(error)
    }
}