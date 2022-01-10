const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// #1 Get allCommentOfPost

exports.getAllCommentOfPost = async (req, res, next) => {
  try {

    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(req.params.id)
      },
      include: { author: true },
    })
    res.json(comments)
  } catch (error) {
    next(error)
  }
};

// #2 Post 'comment'

exports.createComment = async (req, res, next) => {
  try {
    const comment = await prisma.comment.create({
      data: req.body,
    })
    res.json(comment)
  } catch (error) {
    next(error)
  }
};

// #3 Delete comment by id

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedComment = await prisma.comment.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(deletedComment)
  } catch (error) {
    next(error)
  }
}

// #4 Delete all comments

exports.deleteAllcommentOfPost = async (req, res, next) => {
  try {
    const deletedComments = await prisma.comment.deleteMany({
      where: {
        postId: Number(req.params.id)
      },
    })
    res.json(deletedComments)
  } catch (error) {
    next(error)

  }
}

// #5 Modify comment by id 

exports.modifyComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await prisma.comment.update({
      where: {
        id: Number(id),
      },
      data: req.body
    })
    res.json(comment)
  } catch (error) {
    next(error)
  }
}