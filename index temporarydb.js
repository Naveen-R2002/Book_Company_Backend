// Main Backend File

const db = require("./database/index");
// console.log(db);
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");

const app = express();
app.use(express.json());

// http://localhost:3000/
app.get("/",(req,res) => {
    return res.json({"WELCOME": `Welcome to Backend Software for Book Company`});
});

// http://localhost:3000/books
app.get("/books",(req,res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);
});

// http://localhost:3000/book-isbn/12345Two
app.get("/book-isbn/:isbn",(req,res) => {
    // console.log(req.params);
    const {isbn} = req.params;   //object destructuring 
    // console.log(isbn);
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn );
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if (getSpecificBook.length === 0){
        return res.json({"error":`No book found for the ISBN ${isbn}`})
    }
    return res.json(getSpecificBook[0]);
});

// http://localhost:3000/book-category/programming
app.get("/book-category/:category", (req,res) => {
    const {category} = req.params;
    const getSpecificBooks = db.books.filter((book) => book.category.includes(category));
    if (getSpecificBooks.length === 0){
        return res.json({"error":`No book found for the Category of ${category}`})
    }
    return res.json(getSpecificBooks);
});

// http://localhost:3000/authors
app.get("/authors",(req,res) => {
    const getAllAuthors = db.authors;
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
app.post("/book",(req,res) => {
    // console.log(req.body);
    db.books.push(req.body);
    return res.json(db.books);
});

// http://localhost:3000/author
app.post("/author",(req,res) => {
    // console.log(req.body);
    db.authors.push(req.body);
    return res.json(db.authors);
});

// http://localhost:3000/publication
app.post("/publication",(req,res) => {
    // console.log(req.body);
    db.publications.push(req.body);
    return res.json(db.publications);
});


// PUT APIs
// http://localhost:3000/book/update/12345ONE
app.put("/book/update/:isbn",(req,res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {isbn} = req.params;
    db.books.forEach((book)=>{
        if(book.ISBN === isbn){
            return {...book, ...req.body};
        }
        return book;
    })
    return res.json(db.books);
});

// http://localhost:3000/author-update/1
app.put("/author-update/:id",(req,res) =>{
    // console.log(req.params);
    let {id} = req.params;
    id = Number(id)
    db.authors.forEach((author) => {
        if(author.id === id){
            // console.log({...author, ...req.body})
            return {...author, ...req.body}
        }
        return author;
    })
    return res.json(db.authors);
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
app.delete("/book-delete/:isbn",(req,res) => {
    console.log(req.params);
    const {isbn} = req.params;
    const filteredBooks = db.books.filter((book) => {
       return book.ISBN!=isbn;
    })
    // console.log(filteredBooks)
   db.books = filteredBooks;
   return res.json(db.books);
});

// http://localhost:3000/book-author-delete/12345ONE/2
app.delete("/book-author-delete/:isbn/:id",(req,res) => {
    console.log(req.params);
    let {isbn,id} = req.params;
    id = Number(id);
    db.books.forEach((book)=>{
        if(book.ISBN === isbn){
            if(!book.authors.includes(id)){
                return;
            }
            book.authors = book.authors.filter((author) => author !== id);
            return book;
        }
        return book;
    })
    return res.json(db.books);
});


// http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn",(req,res) => {

});

// http://localhost:3000/author-delete/1
app.delete("/author-book-delete/:id",(req,res) => {

});

// http://localhost:3000/publication-delete/1
app.delete("/publication-delete/:id",(req,res) => {

});

app.listen(3000, () => {
    console.log("My Express is running....");
});