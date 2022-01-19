let books = [                              //array of objects
    {
     ISBN: "12345ONE",
     title: "Getting Started with MERN",
     authors : [1,2],
     language : "en",
     pubDate : "2021-07-07",
     numOfPage: 225,
     category : ["fiction","programming","tech","web dev"],
     publication : 1
    },
    {
     ISBN: "12345Two",
     title: "Getting Started with PYTHON",
     authors : [1,2],
     language : "en",
     pubDate : "2021-07-07",
     numOfPage: 550,
     category : ["fiction","tech","web dev"],
     publication : 1
    }
];      

let authors = [
    {
        id:1,
        name:"Naveen",
        books:["12345ONE","12345Two"]
    },
    {
        id:2,
        name:"Ram",
        books:["12345ONE","12345Two"]
    }
];

let publications = [
    {
        id:1,
        name:"Naveen Publications",
        books:["12345ONE","12345Two"]
    },
    {
        id:2,
        name:"Ram Publications",
        books:[]
    }
];

module.exports = {books,authors,publications};