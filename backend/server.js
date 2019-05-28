const express = require('express');
const app = express();
const multer = require('multer'); //Fil-håndtering
const cors = require('cors');
// const bodyParser = require('body-parser');

const PORT = 4006 // Porten som serveren skal køre på

// *** EXPRESS SERVER - Opsætning
// ************************************************** 

app.use(cors());
//app.use(bodyParser.json());
app.use(express.static('public')); // statiske filer puttes i "public-folder"
app.listen(PORT, function(){
    console.log("Serveren er i fin form og lytter på port: ", PORT)
});

// API - GET POST PUT DELETE
// ************************************************** 

// GET: Helloworld
// http://localhost:4006/helloworld

app.get('/Helloworld', function(req, res){
    res.json("Hej fra API - der er hul igennem og datoen er: " + Date());
});

// POST - UPLOAD FIL/IMAGE

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images');  //Hvor filen skal gemmes
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage : storage }).single('file');

// post image til server (public/images)
app.post('/upload', function(req, res){
    upload(req, res, function(err){

        // Hvis der opstod dejl ved upload
        if(err){
            return res.status(500).json(err);
        }

        // Hvis alt gik godt
        console.log("OK", req.file);
        return res.status(200).send(req.file)
    });

});