import express from 'express'
import wrap from '../wrap'

const router = express.Router()
// const dataCollections = [
//   'projects',
//   'folders',
//   'categories',
//   'framingQuestions',
//   'questions',
//   'users',
//   'checklists',
//   'usersCategories',
//   'checklists',
//   'answers',
//   'comments',
//   'reviews',
//   'financialStatements',
//   'reviewNotes'
// ]

router.post(`/api/hello`, wrap(async (req, res, next) => {
  cosole.log(req.body)
  // let { data, params } = req.body
  // console.log(data)
  // let projects = await dbService.insert(collection, data)
  // if (params) {
  //   return res.send(await dbService.get(collection, JSON.parse(params)))
  // }
  // return res.send(projects.insertedId)
}))

export default router
