//Joshua O. Pagcaliwagan 2023-00016 CMSC 100 C-1L Exer 5 JavaScript Express
import needle from 'needle';

//add books
needle.post(
    'http://localhost:3000/add-book',
    { bookName: "Harry Potter and the Philosopher’s Stone", isbn: "978-0-7475-3269-9", author: "J.K Rowling", yearPublished: "1997" },
    (err, res) => {
        console.log(res.body);
    }
);

needle.post(
    'http://localhost:3000/add-book',
    { bookName: "Harry Potter and the Chamber of Secrets", isbn: "0-7475-3849-2", author: "J.K Rowling", yearPublished: "1998" },
    (err, res) => {
        console.log(res.body);
    }
);

needle.post(
    'http://localhost:3000/add-book',
    { bookName: "The Little Prince", isbn: "978-0156012195", author: "Antoine Saint-Exupery", yearPublished: "1943" },
    (err, res) => {
        console.log(res.body);
    }
);

//find book by ISBN and author
needle.get(
    'http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K%20Rowling',
    (err, res) => {
        console.log(res.body);
    }
);

//find books by author
needle.get(
    'http://localhost:3000/find-by-author?author=J.K%20Rowling',
    (err, res) => {
        console.log(res.body);
    }
);