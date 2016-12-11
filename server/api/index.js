import express from 'express'
import wrap from '../wrap'
import YQL from 'yqlp'

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
  let data = {
    from: 'Excited User <sash19852006@yandex.ru>',
    to: '<dimarakov21@gmail.com>',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  }

  mailgun.messages().send(data, function (error, body) {
    console.log(error)
    console.log(body);
  })
  return res.send(true)
}));

router.post(`/api/weather`, wrap(async (req, res, next) => {
  let { woeid } = req.body
  YQL.exec("SELECT * FROM weather.forecast WHERE woeid=@woeid AND u='c'", { woeid: woeid }, (err, response) => {
    if(err){ return res.status(err.status) }
    return res.send(response.query.results)
  });
}));

export default router
