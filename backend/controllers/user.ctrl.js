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

// #2 Get one user by id

exports.getOneUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: { posts: true, comments: true },
        })
        res.json(user)
    } catch (error) {
        next(error)
    }
}

// #3 Signup

exports.signup = async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10) // 'Hashage' de mot de passe
            .then(async hash => {
                const newUser = await prisma.user.create({
                    data: {
                        lastname: req.body.lastname,
                        firstname: req.body.firstname,
                        jobtitle: req.body.jobtitle,
                        email: req.body.email,
                        password: hash
                    }
                })
                res.json(newUser)
            })
            .catch((error) => console.error(error))
    } catch (error) {
        next(error)
    }
}

// #4 Login

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(401).json({ error: "Utilisateur inconnu" })
        } else
            bcrypt.compare(password, user.password) // Comparaison
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe faux' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.AUTH_KEY,
                            { expiresIn: '24h' }
                        ),
                        isAdmin: user.isAdmin,
                    });
                })
                .catch(error => res.status(500).json(error));
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// #5 Delete user by id

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        })
        res.json(deletedUser)
    } catch (error) {
        next(error)
    }
}

// #6 Modify user by id 

exports.modifyUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const modifiedUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: req.body,
        })
        res.json(modifiedUser)
    } catch (error) {
        next(error)
    }
}