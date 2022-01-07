const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// #1 Get all posts

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
          include: { author: true },
        })
        const users = await prisma.user.findMany({
          include: { posts: true },
        })
        res.json({ posts, users })
      } catch (error) {
        next(error)
      }
}

// #2 Get one post by id

exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id)
      },
      include: { author: true },
      include: { comments: true }
    })
    res.json(post)
  } catch (error) {
    next(error)
  }
}

// #3 Post 'post'

exports.createPost = async (req, res, next) => {
  try {
        const post = await prisma.post.create({
          data: req.body
        })
        res.json(post)
      } catch (error) {
        console.error(error)
        next(error)
      }
};

// #4 Delete post by id

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(deletedPost)
  } catch (error) {
    next(error)
  }
}

// #5 Modify post by id 

exports.modifyPost = async (req, res, next) => {
  try {
    const {id} = req.params
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: {
        author: true
      },
    })
    res.json(post)
  } catch (error) {
    next(error)
  }
}
