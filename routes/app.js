const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')
const models = require('../models')
const Room = models.room

const multer = require('multer')
const app = express()
const path = require('path')

const storage = multer.diskStorage({
   destination: './images/rooms',
   filename: function(req, file, cb){
       cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
   }
});

var upload = multer({storage: storage});
var uploadimg = upload.array('userPhoto',2)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

const ControllersRoom = require('../controllers/rooms')
const ControllersUser = require('../controllers/users')
const ControllersBooking = require('../controllers/booking')

app.group("/api/v1",(router)=>{
    router.get('/rooms', ControllersRoom.index)
    router.get('/room/:id', ControllersRoom.show)
    router.post('/room',verifyToken, ControllersRoom.store)
    router.patch('/room/:id',verifyToken, ControllersRoom.update)    
    router.delete('/room/:id',verifyToken, ControllersRoom.delete)
})

app.group("/user", (router) => {
    router.post('/login', ControllersUser.login)    
    router.post('/registrasi', ControllersUser.registrasi)
    router.post('/booking',verifyToken, ControllersBooking.booking)
    router.post('/uploads', ControllersBooking.upload)
})

app.get('/', (req, res) => res.send('Hello Danang'))

app.post('/input',verifyToken, (req, res) => {
   uploadimg(req, res, (err) => {
      if(err){
              res.send({"message":"error db file"})
          } else {
          if(req.files == undefined){
              res.send({"message":"file undefined"})
          } else {
              const imageName1 = req.files[0].path
              const imageName2 = req.files[1].path
              const totalImages = imageName1+ "," +imageName2
              Room.create({
                  name: req.body.name,
                  address: req.body.address,
                  logitude: req.body.logitude,
                  lotitude: req.body.lotitude,
                  userId: req.body.userId,
                  management: req.body.management,
                  phoneManagement: req.body.phoneManagement,
                  images: totalImages,
                  long: req.body.long,
                  wide: req.body.wide,
                  price: req.body.price
               }).then(room=> res.send(room))
               .catch(err => res.send(err))
          }   
      }
  })
   
})

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(404);
    }
}



module.exports = app;