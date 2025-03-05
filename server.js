//Joshua O. Pagcaliwagan 2023-00016 CMSC 100 C-1L Exer 5 JavaScript Express
import express from 'express'; //import express for servers
import fs from 'fs'; //import file system

const app = express(); //instantiate server
app.use(express.json()); //parse JSON requests
app.use(express.urlencoded({ extended: false })); //parse URL-encoded requests

//add book
app.post('/add-book', (req, res) => {
    //get book details from request body
    const { bookName, isbn, author, yearPublished } = req.body;

    //if any field is missing, return false
    if (!bookName || !isbn || !author || !yearPublished) {
        res.send({ success: false });
        return;
    }

    //empty array to store book records
    let books = [];
    
    //only read book.txt if it exists (cause for first time users it doesn't exist), this is to avoid adding books with same isbn
   if (fs.existsSync('books.txt')) {books = fs.readFileSync('books.txt').toString().split('\n');}

    //temp array to store valid book records 
    let tempBooks = [];

    //process each line in book file  
    for (let line of books) {
        let bookData = line.split(','); //split line by commas  
        //ensure line has 4 fields  
        if (bookData.length == 4) {
            //store book details in object and add it to tempBooks  
            tempBooks.push({ bookName: bookData[0], isbn: bookData[1], author: bookData[2], yearPublished: bookData[3] });
        }
    }

    //assign valid book records back to books array  
    books = tempBooks;

    //if book with same ISBN already exists, return false
    for (let book of books) {
        if (book.isbn == isbn) {
            res.send({ success: false });
            return;
        }
    }

    //append new book entry to file
    fs.appendFileSync('books.txt', `${bookName},${isbn},${author},${yearPublished}\n`);

    //send success response
    res.send({ success: true });
});

//find book by ISBN and Author
app.get('/find-by-isbn-author', (req, res) => {
    //get ISBN and author from query parameters
    const { isbn, author } = req.query;

    //read book file and split into lines
    let books = fs.readFileSync('books.txt').toString().split('\n');

    //variable to store found book
    let foundBook = null; // Use null instead of []

    //iterate through each line in file
    for (let line of books) {
        let bookData = line.split(','); //split by comma
        
            //check if ISBN and author match query  
            if (bookData[1] === isbn && bookData[2] === author) {
                //store found book details  
                foundBook = { bookName: bookData[0], isbn: bookData[1], author: bookData[2], yearPublished: bookData[3] };
                break; //stop searching once found  
        }
    }

    //send book details if found, else send msg nothing found
    if (foundBook) res.send(foundBook);
    else res.send("No Books Found");
});

//find books by author
app.get('/find-by-author', (req, res) => {
    //get author from query parameters
    const { author } = req.query;

    //read book file and split into lines
    let books = fs.readFileSync('books.txt').toString().split('\n');

    //array to store books written by given author
    let foundBooks = [];

    //iterate through each line in file
    for (let line of books) {
        let bookData = line.split(','); //split by commas  

            //if author matches query  
            if (bookData[2] == author) {
                //add book to foundBooks array  
                foundBooks.push({ bookName: bookData[0], isbn: bookData[1], author: bookData[2], yearPublished: bookData[3] });

        }
    }
    //send list of books by author if found, else send msg nothing found 
    res.send(foundBooks.length ? foundBooks : "No Books Found");
});

//start server
app.listen(3000, () => {
    console.log("Server started at port 3000");
});

/*References:
https://www.w3schools.com/jsref/jsref_push.asp
https://www.geeksforgeeks.org/express-js-req-query-property/
*/