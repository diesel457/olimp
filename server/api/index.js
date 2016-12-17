import express from 'express'
import wrap from '../wrap'
import YQL from 'yqlp'
import multiparty from 'multiparty'
import fs from 'fs'
import path from 'path'

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

router.post(`/api/upload-photo`, wrap(async (req, res, next) => {
  let form = new (multiparty.Form)

  form.parse(req, (err, fields, files) => {
    let filePath = files.file[0].path
    let splitedPath = filePath.split('/')
    let fileName = splitedPath[splitedPath.length - 1]
    fs.exists('public/uploaded/', (exist) => {
      if(exist){
        console.log('Folder: public/uploaded/, is exist')
      }else{
        fs.mkdirSync('public/uploaded/')
      }
    });
    fs.readFile(filePath, (err, img) => {
      let publicFolder = path.join('public/uploaded/', fileName)
      fs.writeFile(publicFolder, img, (err) => {
        let obj = {
          path: '/uploaded/'+fileName,
          file: fileName
        }
        res.send(obj)
      });
    });
  });

}));

router.post(`/api/delete-img`, wrap(async (req, res, next) => {
  let {images} = req.body

  images.forEach((item) => {
    fs.unlinkSync('public' + item.path)
  })
  
  res.send(true)
}));




export default router
