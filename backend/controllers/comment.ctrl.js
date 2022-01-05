const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// #1 Post 'comment'

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

// #2 Delete comment by id

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

// #3 Modify comment by id 

exports.modifyComment = async (req, res, next) => {
  try {
    const {id} = req.params
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