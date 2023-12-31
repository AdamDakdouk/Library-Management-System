# LibraryManagementSystem

No educational institution can exist without a library management system. It is an important part of every school and college and helps the librarian to keep records of available books as well as issued books. 

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Getting Started

To get a local copy up and running follow these simple steps:

### Prerequisite
*
  npm
  ```sh
  npm install node.js
  ```

### Installation 

1. Clone the repo
   ```sh
   git clone https://github.com/AdamDakdouk/Library-Management-System.git
   ```
   
2. Install NPM packages  

   ```sh
      npm install sequelize
   ```

   ```sh
      npm install mysql2
   ```
   
   ```sh
      npm install express
   ```

   ```sh
      npm install nodemon
   ```

   ```sh
      npm install express-validator
   ```

   ```sh
      npm install dotenv
   ```

   ```sh
      npm install moment
   ```

   ```sh
      npm install jsonwebtoken
   ```

   ```sh
      npm install ejs
   ```

   ```sh
      npm install cors
   ```

   ```sh
      npm install crypto
   ```

   ```sh
      npm install body-parser
   ```

3. Run ```npm run dev``` to listen to the API on port 3001


## Configuration

 Enter your database connection confugiration in the ".env" file  
 Check .env.example for reference

## Usage
Some of the methods found in the project:  

- getStudentByID(id): Retrieve student details by ID    
- insertStudent(student): insert student to database   
- deleteStudent(id): Delete a student    
- updateStudent(id): Update a student  
- getBookById(id): get book details  
- deleteBook(id): Delete a book  
- insertBook(book): insert a book into the database   
- updateBook(book): update a specified book  
- issueBook(student_id, book_id): Issue a book to a student  
- returnBook(student_id, book_id): return a book from a student


