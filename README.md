# Library Management System



## Prerequisites
-VS code, I used Thunder client for testing, Mongo DB

## Setup and Installation

1. Clone the repository

2. Install dependencies
npm install

4. start the application
node src/app.js

## Database Connection

1. Open MongoDB Compass
2. Connect to mongodb
  

## Testing with Thunder Client

### Authors API

1. Add authors
   - POST http://localhost:3000/api/authors
   - Examples--
 
{
  "name": "IE Irodov",
  "bio": "Famous for physics problems and theoretical concepts"
}

{
  "name": "Chetan Bhagat",
  "bio": "Contemporary Indian novelist with bestselling fiction books"
}

{
  "name": "JK Rowling",
  "bio": "Creator of Harry Potter series and fantasy novels"
}

{
  "name": "RD Sharma",
  "bio": "Known for mathematics textbooks widely used in Indian schools"
}

{
  "name": "HC Verma",
  "bio": "Renowned physics author popular for Concepts of Physics"
}

2. Get all authors
   - GET http://localhost:3000/api/authors

3. Update author
   - PUT http://localhost:3000/api/authors/:authorId
{
  "name": "HC Verma",
  "bio": "Physics professor and author of Concepts of Physics volumes"
}


## Replace ID by actual ID while calling any request 
### Attached pictures at the end of testing

4. Get author by ID
   - GET http://localhost:3000/api/authors/:authorId

5. Get author by book
   - GET http://localhost:3000/api/authors/book/:bookId

### Users API

1. Add users
   - POST http://localhost:3000/api/users
   - Sample 
{
  "name": "Rishabh Pandey",
  "phone": "9876543210",
  "email": "rishabh@gmail.com",
  "address": "G122 IIT Guwahati",
  "gender": "male"
}

{
  "name": "Kartikey Sharma",
  "phone": "8765432109",
  "email": "kartikey@gmail.com",
  "address": "H Block IIT Roorkee",
  "gender": "male"
}

{
  "name": "Anjali Singh",
  "phone": "7654321098",
  "email": "anjali@gmail.com",
  "address": "Sector 62 Gurugram",
  "gender": "female"
}

{
  "name": "Rohit Kumar",
  "phone": "6543210987",
  "email": "rohit@gmail.com",
  "address": "Dwarka New Delhi",
  "gender": "male"
}

2. Get all users
   - GET http://localhost:3000/api/users

### Books API

1. Add books
   - POST http://localhost:3000/api/books
   - Sample payloads (replace :authorId with actual IDs from your database):
   - 
{
  "title": "Problems in General Physics",
  "description": "Collection of physics problems for advanced students",
  "author": ":authorId for IE Irodov",
  "price": 450
}

{
  "title": "Half Girlfriend",
  "description": "A romance novel set in rural Bihar and Delhi",
  "author": ":authorId for Chetan Bhagat",
  "price": 250
}

{
  "title": "Harry Potter and the Philosopher's Stone",
  "description": "First book in the Harry Potter series",
  "author": ":authorId for JK Rowling",
  "price": 350
}

{
  "title": "Mathematics XI",
  "description": "Comprehensive mathematics textbook for class 11",
  "author": ":authorId for RD Sharma",
  "price": 395
}

{
  "title": "Concepts of Physics Vol 1",
  "description": "Fundamental physics concepts with solved examples",
  "author": ":authorId for HC Verma",
  "price": 425
}

2. Get all books
   - GET http://localhost:3000/api/books

3. Get books by author
   - GET http://localhost:3000/api/books/author/:authorId

4. Update book
   - PUT http://localhost:3000/api/books/:bookId
{
  "title": "Harry Potter and the Philosopher's Stone",
  "description": "The first magical adventure in the Harry Potter series",
  "price": 399
}

5. Get book by ID
   - GET http://localhost:3000/api/books/:bookId



### Borrow API

1. Borrow a book
   - POST http://localhost:3000/api/borrow/:userId/:bookId

2. Get borrowed books by user
   - GET http://localhost:3000/api/borrow/user/:userId

3. Return a book
   - PUT http://localhost:3000/api/borrow/:borrowId/return
   




    ![Screenshot (353)](https://github.com/user-attachments/assets/b9102539-5596-42d5-bfe7-ccc4e1fc8674)

![Screenshot (352)](https://github.com/user-attachments/assets/7b993cdb-6f71-4b76-bd0e-96a3969f94d2)
![Screenshot (351)](https://github.com/user-attachments/assets/06d59760-2bb7-4133-8c8e-93c673842b19)
![Screenshot (350)](https://github.com/user-attachments/assets/8cab335e-8808-44af-90f4-5d2faf97ad60)
![Screenshot (349)](https://github.com/user-attachments/assets/00f83245-dc4c-4a15-acfd-928b071b7687)
![Screenshot (348)](https://github.com/user-attachments/assets/90cbf2f0-388c-42ba-8d51-c7c477284016)
