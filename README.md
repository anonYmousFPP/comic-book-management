# Comic Book Store Backend

## Overview
This project is a backend for a React-based e-commerce store that allows the management and display of comic books as inventory items. It provides a REST API for managing comic book inventory, including CRUD operations, filtering, sorting, and pagination.

## Features
- **Comic Book Management API**: Create, update, and delete comic books.
- **Comic Book List API**: Retrieve a list of comic books with pagination, filtering, and sorting.
- **Comic Book Details API**: Retrieve details of a specific comic book by ID.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **dotenv**
- **Zod** for validation
- **Postman** for API testing

## Prerequisites
To run this project locally, you'll need:
- Node.js (v12+)
- MongoDB
- Postman (for testing)

## Setup Instructions

1. **Clone the Repository**
    ```bash
    git clone https://github.com/anonYmousFPP/comic-book-management.git
    cd comic-book-management
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Create a `.env` file** in the project copy .env.example and create .env file and paste it:
    ```env
    PORT=3000
    MONGO_URL=mongodb://localhost:27017/comicBooks
    ```

4. **Start MongoDB** if it's not already running:
    ```bash
    mongod
    ```
    or

    Run docker command for mongoDB container pulling
    ```bash
    docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
    ```

5. **Run the Project**
    ```bash
    npm start
    ```

6. **Server will be running on**:
    ```
    http://localhost:3000
    ```

## API Endpoints

### Comic Book Management

1. **Add a Comic Book**
    - **Method**: `POST`
    - **URL**: `localhost:3000/book/add`
    - **Body** (example):
      ```json
      {
        "book_name": "Spider-Man",
        "author_name": "Stan Lee",
        "year_of_publication": "1962",
        "price": 100,
        "discount": "10%",
        "number_of_pages": 200,
        "condition": "new",
        "description": "First edition of Spider-Man comics"
      }
      ```

2. **Edit a Comic Book**
    - **Method**: `PUT`
    - **URL**: `localhost:3000/book/update/?id={id of comic book}`
    - **Body** (example):
      ```json
      {
        "price": 150,
        "condition": "used"
      }
      ```

3. **Delete a Comic Book**
    - **Method**: `DELETE`
    - **URL**: `localhost:3000/book/delete/?id={id of comic book}`

### Comic Book List API

1. **Fetch Inventory List**
    - **Method**: `GET`
    - **URL**: `http://localhost:3000/book/allBooks`
    - **Query Parameters (Optional)**:
      - `page`: Page number for pagination (default is `1`).
      - `limit`: Number of items per page (default is `10`).
      - `sort`: Field to sort by (e.g., `price`, `year_of_publication`, `book_name`).
      - `order`: Sorting order (`asc` or `desc`).
      - `author_name`, `year_of_publication`, `price`, `condition`: Filters.

2. **Get Comic Book Details**
    - **Method**: `GET`
    - **Endpoint**: `http://localhost:3000/book/allBooks?page=${number_of_page}&limit=${limit of content}`
    - **Description**: Fetch the list of comic books with pagination support.
    - **Query Parameters**:
    - `page`: _(optional)_ Page number for pagination (default: `1`).
    - `limit`: _(optional)_ Number of items per page (default: `10`).

    - **Example Request**:
    ```bash
    GET http://localhost:3000/book/allBooks?page=1&limit=10

### 3. **Apply Filters and Sorting**
   - **Method**: `GET`
   - **URL**: `http://localhost:3000/book/filter?price=${price}&year_of_publication=${year}&sort={parameter}:asc`
   - **Query Parameters**:
     - `author_name`: _(optional)_ Filter comic books by the author's name.
     - `year_of_publication`: _(optional)_ Filter comic books by their year of publication.
     - `price`: _(optional)_ Filter comic books by price. Use operators like `$lte` for less than or equal to.
     - `condition`: _(optional)_ Filter comic books by their condition (e.g., `new` or `used`).
     - `sort`: _(optional)_ Field to sort by (e.g., `price`, `year_of_publication`, `book_name`).
     - `order`: _(optional)_ Sorting order (`asc` or `desc`).

   - **Example Request**:
   ```bash
   GET http://localhost:3000/book/filter?author_name=John Doe&year_of_publication=2020&price[$lte]=20&condition=new&sort=price&order=asc



## Postman Collection

To test the API endpoints, you can use the provided **Postman Collection**.

1. Download the Postman Collection file (`Comic Book Management API.postman_collection.json`) from the repository.
2. Import the collection into Postman by going to:
   - **Postman > Import > Upload Files > Select `ComicBookStore.postman_collection.json`**

## Pagination, Filtering, and Sorting

- **Pagination**: Use the `page` and `limit` query parameters to paginate the list of comic books.
  - Example: `GET /comic-books/all?page=2&limit=5`

- **Filtering**: Apply filters like `author_name`, `year_of_publication`, `price`, and `condition`.
  - Example: `GET /comic-books/all?author_name=Stan Lee&condition=new`

- **Sorting**: Use the `sort` and `order` query parameters to sort by `price`, `year_of_publication`, or `book_name`.
  - Example: `GET /comic-books/all?sort=price&order=asc`

## Error Handling
The API includes robust error handling:
- If an invalid request is made (e.g., missing required fields), appropriate error messages will be returned.
- Input validation is done using **Zod** to ensure valid data.

## Project Structure
├── api/                           # Folder for comic book-related API routes and logic
│   └── comic_book.js              # API endpoints for comic book management
├── schema/                        # Database schemas
│   └── book.schema.js             # Comic book data schema
├── .env                           # Environment variables (should not be committed)
├── .env.example                   # Template for environment variables
├── Comic Book Management API.postman_collection.json  # Postman collection for API testing
├── dummy_data.json                # Contains 50 dummy comic book records
├── index.js                       # Entry point of the application (main server file)
├── package.json                   # Dependencies and project information
├── README.md                      # Project documentation
