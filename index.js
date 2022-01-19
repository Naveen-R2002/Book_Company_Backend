// Main Backend File

const db = require("./database/index");
const BookModel = require("./database/books");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publications")

const mongoose = require('mongoose');
const express = require("express");

const app = express();
app.use(express.json());

var mongoDB  = 'mongodb+srv://naveen:NJbf8Z0yaTgUWCZI@cluster0.1gdio.mongodb.net/book-company?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("connection established"))
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://naveen:NJbf8Z0yaTgUWCZI@cluster0.1gdio.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const bcollection = client.db("book-company").collection("books").findOne({ISBN: "12345Three"});
//   bcollection.then((data)=>console.log(data));
// });

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
//     console.log("The Databases are:")
//     databasesList.databases.forEach(db=>console.log(db.name));
// }
// async function main() {
//   const uri = "mongodb+srv://naveen:NJbf8Z0yaTgUWCZI@cluster0.1gdio.mongodb.net/book-company?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   try {
//       await client.connect();
//       const result = await client.db("book-company").collection("books").findOne({ISBN: "12345Three"});
//       console.log(result);
//     //   await listDatabases(client);
//   }
//   catch (err){
//       console.log(err);
//   }
//   finally {
//       await client.close();
//   }
// }
// main();

// http://localhost:3000/
app.get("/",(req,res) => {
    return res.json({"WELCOME": `Welcome to Backend Software for Book Company`});
});

// http://localhost:3000/books
app.get("/books",async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

// http://localhost:3000/book-isbn/12345Three
app.get("/book-isbn/:isbn", async (req,res) => {
    // console.log(req.params);
    const {isbn} = req.params;   //object destructuring 
    // console.log(isbn);
    const getSpecificBook = await BookModel.findOne({ISBN:isbn});;
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if (getSpecificBook === null){
        return res.json({"error":`No book found for the ISBN ${isbn}`})
    }
    return res.json(getSpecificBook);
});

// http://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req,res) => {
    const {category} = req.params;
    const getSpecificBooks = await BookModel.find({category:category});
    if (getSpecificBooks.length === 0){
        return res.json({"error":`No book found for the Category of ${category}`})
    }
    return res.json(getSpecificBooks);
});

// http://localhost:3000/authors
app.get("/authors", async (req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// http://localhost:3000/author/id
app.get("/author/:id",(req,res) => {
    let {id} = req.params;   //object destructuring 
    id = Number(id);
    const getSpecificAuthor = db.authors.filter((author) => author.id === id );
    if (getSpecificAuthor.length === 0){
        return res.json({"error":`No Author found for the id of ${id}`})
    }
    return res.json(getSpecificAuthor[0]);
});

// http://localhost:3000/author-isbn/12345Two
app.get("/author-isbn/:isbn",(req,res) => {
    const {isbn} = req.params;   //object destructuring 
    const getSpecificAuthor = db.authors.filter((author) => author.books.includes(isbn));
    if (getSpecificAuthor.length === 0){
        return res.json({"error":`No Author found for the ISBN of ${isbn}`})
    }
    return res.json(getSpecificAuthor);
});

// http://localhost:3000/publications
app.get("/publications",(req,res) => {
    const getSpecificPublications = db.publications;
    return res.json(getSpecificPublications);
});

// http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn",(req,res) => {
    const getSpecificPublications = db.publications;
    return res.json(getSpecificPublications);
});


// POST API
// http://localhost:3000/book
app.post("/book",async(req,res) => {
    // console.log(req.body);
    const addNewBook = await BookModel.create(req.body);
    return res.json({
        bookAdded:addNewBook,
        message:"Book Was added !!!"
    });
});

// http://localhost:3000/authors
app.post("/authors",async(req,res) => {
    // console.log(req.body);
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json({
        AuthorAdded:addNewAuthor,
        message:"Author Was added !!!"
    })
});

// http://localhost:3000/publication
app.post("/publication",(req,res) => {
    // console.log(req.body);
    db.publications.push(req.body);
    return res.json(db.publications);
});


// PUT APIs
// http://localhost:3000/book/update/123Two
app.put("/book/update/:isbn",async(req,res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {isbn} = req.params;
    // const updateBook = await BookModel.updateOne(req.body);
    const updateBook = await BookModel.findOneAndUpdate({ISBN:isbn},req.body,{new:true});

    return res.json({
        bookUpdated:updateBook,
        message:"Book Was updated !!!"
    });
});

// http://localhost:3000/author-update/1
app.put("/author-update/:id",async(req,res) =>{
    // console.log(req.params);
    let {id} = req.params;
    const authorBook = await AuthorModel.findOneAndUpdate({id:id},req.body,{new:true});

    return res.json({
        bookUpdated:authorBook,
        message:"Book Was updated !!!"
    });
})

// http://localhost:3000/publication-update/1
app.put("/publication-update/:id",(req,res) => {
    let {id} = req.params;
    id = Number(id);
    db.publications.forEach((publication) => {
        if(publication.id === id){
            // console.log({...publication,...req.body});
            return {...publication,...req.body};
        }
        return publication;
    })
    return res.json(db.publications);
});

// DELETE APIs
// http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn",async(req,res) => {
    console.log(req.params);
    const {isbn} = req.params;
    const deleteBook = await BookModel.deleteOne({ISBN:isbn});

    return res.json({
        bookDeleted:deleteBook,
        message:"Book Was Deleted !!!"
    });
});

// http://localhost:3000/book-author-delete/12One/1
app.delete("/book-author-delete/:isbn/:id",async(req,res) => {
    const {isbn,id} = req.params;

    let getSpecificBook = await BookModel.findOne({ISBN:isbn});
    if (getSpecificBook === null){
        return res.json({"error":`No book found for the ISBN ${isbn}`})
    }
    else{
        getSpecificBook.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ISBN:isbn},getSpecificBook,{new:true});
        return res.json ({bookUpdated:updateBook, message: "Author was Deleted from the book !!!"})
    }
});

app.listen(3000, () => {
    console.log("My Express is running....");
});