import express from 'express'
import multer from 'multer'
import path from 'path'
const app = express()



app.set("view engine","ejs")
const PORT = process.env.PORT || 3001;

const storage = multer.diskStorage({
    destination:(req,fiile,cb)=>{
        cb(null,'public/upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+ Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

// const uploadMultiple = upload.fields([{name:'field1', maxCount:1},{name:'field2', maxCount:3}])
app.get("/",(req,res)=>{
    res.render('index')
})

app.post("/uploadfile",upload.single("file1"),(req,res)=>{
    if(req.file){
        console.log(req.file)
        res.send("uploaded")
    }
})

app.listen(PORT,(req,res)=>{
    console.log(`server running on localhost://${PORT}`)
})

