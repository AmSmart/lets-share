const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')

const Schema = mongoose.Schema;

const Page = new Schema({
    creator_name: String,
    page_id: String,
    page_name: String,
    created_at: Date
});

const Media = new Schema({
    author_name: String,
    text: String,
    imageUrl: String,
    page_id: String,
    created_at: Date
});

const PageModel = mongoose.model('Page', Page)
const MediaModel = mongoose.model('Media', Media)

mongoose.connect('mongodb://localhost:27017/lets-share')
    .then(() => {
        console.log("DB Connection Successful")
    })
    .catch(() => {
        console.log("DB Connection Failed")
    })

const PORT = 3001
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* 
HTTP Methods

GET POST PUT DELETE PATCH

1. Create a page - POST
2. Get all media from a page - GET
3. Add media to page - 

*/

app.get("/", (req, res) => {
    res.send("Our app is working!")
})

app.post("/page", async (req, res) => {
    console.log(req.body)
    const { creator_name, page_name, } = req.body

    // Validation
    let totalCount = await PageModel.count()

    const page = new PageModel({
        creator_name,
        page_id: totalCount + 1,
        page_name,
        created_at: new Date()
    })

    await page.save()
    console.log("Page Created Successfully")
    res.send()
})

app.get("/all-media", async (req, res) => {
    let {page_id} = req.query
    let allMedia = await MediaModel.find({page_id})
    res.send(allMedia)
})

app.post("/media", async (req, res) => {
    const {author_name, text, imageUrl, page_id} = req.body;
    // Validation
    const media = new MediaModel({author_name, text, imageUrl, page_id})
    
    await media.save()
    res.send()
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})