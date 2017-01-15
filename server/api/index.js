import express from 'express'
import wrap from '../wrap'
import YQL from 'yqlp'
import multiparty from 'multiparty'
import fs from 'fs'
import path from 'path'
import passport from 'passport'
import bcrypt from 'bcrypt-nodejs'
let api_key = 'key-58092896fc45f3742e9b0395582b7abc';
// let api_key = 'key-58092896fc45f3742e9b0395582b7abc';
let domain = 'sandbox38b56b4e66624b99890801bcad84e1bd.mailgun.org';
let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const router = express.Router()
const loginOptions = {
  successRedirect: '/',
  failureRedirect: '/aleksandra007',
  failureFlash: true
}

router.post(`/api/login`,
  passport.authenticate('local-signup', loginOptions)
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get(`/api/create-admin`, wrap(async (req, res, next) => {
  let { model } = req
	let { username = 'admin', password = 'admin' } = req.body
  let $auths = model.query('auths', {admin: true})

  model.fetch($auths, () => {
    let admin = $auths.get()[0]

    if(!admin) {

      let adminFields = {
        admin: true,
        username: username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      }

      model.add('auths', adminFields, function(){
        return res.send('Successfull.')
      });

    }else{
      return res.send('Admin user is created.')
    }

  });

}));

router.get(`/api/create-home-info`, wrap(async (req, res, next) => {
  let { model } = req
  let $homeAd = model.query('homeAd', {})
  model.fetch($homeAd, () => {
    if($homeAd.get().length) {
			res.send('Document is exist.')
		}else{
			let homeAdFields = {
	      title: 'Гостевой дом «Олимп»',
	      subTitle: 'Гостевой дом «Олимп» расположен в самом центре курортного'+
	                'поселка Любимовка, на берегу Черного моря, в 2-х минутах'+
	                'ходьбы от большого широкого песчано-галечного пляжа.'+
	                'За 15-20 минут общественным транспортом можно добраться до'+
	                'исторического центра города Севастополя.',
	      paragraphs: [

	        'Гостевой дом представляет собой отдельно стоящее 4-х этажное здание,'+
	        'расположенное на закрытой и круглосуточно охраняемой территории с зоной'+
	        'отдыха. Год постройки 2016.',

	        'К Вашим услугам круглосуточная стойка регистрации, внимательный'+
	        'персонал предоставит Вам всю необходимую информацию, а так же поможет'+
	        'с организацией трансфера и заказом экскурсий по всему Крымскому побережью.',

	        'Бронирование номера в нашем гостевом доме станет отличным выбором для'+
	        'спокойного размеренного семейного отдыха в дали от забот и суеты!'
	      ]
	    }

	    model.add('homeAd', homeAdFields, function(){
	      return res.send('Successfull.')
	    });
		}
  });
}));

router.post(`/api/send-email`, wrap(async (req, res, next) => {
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
    if(!response.query && !response.query.results) return res.status('Not have result.')
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

router.post(`/api/delete-photo`, wrap(async (req, res, next) => {
  let {images} = req.body

  images.forEach((item) => {
    fs.unlinkSync('public' + item.path)
  })

  res.send(true)
}));




export default router
