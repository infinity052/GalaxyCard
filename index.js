const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer')

// const bodyParser = require('body-parser');

app.use(express.json())
app.use(cors());

var adminController = require('./controllers/admin');
var userController = require('./controllers/user');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
var upload = multer({storage : storage});

app.get('/getfilenames' , async function(request, response){
    var json = await userController.getFileNames();
    response.send(json);
});

app.get('/admin/getusers', async function(request, response){
    var json = await adminController.getAllUsers();
    response.send(json);
});

app.post('/uploadfile' ,upload.single('file'), function(request,response){
    try {
        userController.addFile(request.file.filename, request.file.originalname);
        response.sendStatus(200);
    }catch(err) {
        response.sendStatus(400);
    }
})

app.post('/deletefile', function(request,response){
    userController.deleteFile(request.body.id);
    response.sendStatus(200);
})

app.post('/admin/createuser', async function(request,response){
   try{
       await adminController.createUser(request.body.username, request.body.firstname, request.body.lastname);
       response.sendStatus(200);
   }catch(err){
       console.log(err);
       response.sendStatus(400);
    }
})

app.post('/admin/deleteuser', async function(request,response){
    try{
        await adminController.deleteUser(request.body.id);
        response.sendStatus(200);
    }catch(err){
        console.log(err);
        response.sendStatus(400);
     }
 })

app.listen(8080, ()=>{
    console.log("listening for requests");
})