# Quotes API Documentation

## Introduction

The **Quotes API** is a RESTful web service that allows you to manage a collection of quotes. Each quote has a unique serialized ID (UUID) rather than an incremental integer ID, ensuring that each quote can be uniquely identified across different systems and contexts. The API supports basic CRUD (Create, Read, Update, Delete) operations for quotes.

## Base URL

The API is hosted locally at:

```
http://localhost:3000
```

## Endpoints Overview

- **GET /quotes**: Retrieve all quotes.
- **GET /quotes/:id**: Retrieve a single quote by its ID.
- **POST /quotes**: Create a new quote.
- **PUT /quotes/:id**: Update an existing quote by its ID.
- **DELETE /quotes/:id**: Delete a quote by its ID.

## Data Format

Quotes are stored as JSON objects in the following format:

```json
[
    {
        "id": "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
        "quote": "The only limit to our realization of tomorrow is our doubts of today.",
        "author": "Franklin D. Roosevelt",
        "year": 1945
    },
    {
        "id": "7p8q9r0s-t1u2v3w4-x5y6z7a8b9c0",
        "quote": "In the middle of every difficulty lies opportunity.",
        "author": "Albert Einstein",
        "year": 1946
    }
]
```

- **`id`**: A unique serialized ID generated using UUID format (e.g., `1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6`).
- **`quote`**: The text of the quote.
- **`author`**: The name of the person who said the quote.
- **`year`** (optional): The year the quote was said or published.

## API Endpoints

### 1. Retrieve All Quotes

**Endpoint**: `GET /quotes`

**Description**: Retrieves all quotes stored in the API.

**Response**:

- **Status**: `200 OK`
- **Body**: An array of quote objects.

**Example Request**:

```bash
GET http://localhost:3000/quotes
```

**Example Response**:

```json
[
    {
        "id": "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
        "quote": "The only limit to our realization of tomorrow is our doubts of today.",
        "author": "Franklin D. Roosevelt",
        "year": 1945
    },
    {
        "id": "7p8q9r0s-t1u2v3w4-x5y6z7a8b9c0",
        "quote": "In the middle of every difficulty lies opportunity.",
        "author": "Albert Einstein",
        "year": 1946
    }
]
```

### 2. Retrieve a Single Quote by ID

**Endpoint**: `GET /quotes/:id`

**Description**: Retrieves a specific quote by its unique serialized ID.

**Parameters**:

- **`id`**: The serialized ID of the quote (UUID format).

**Response**:

- **Status**: `200 OK` if the quote is found.
- **Body**: The quote object.
- **Status**: `404 Not Found` if the quote does not exist.

**Example Request**:

```bash
GET http://localhost:3000/quotes/1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6
```

**Example Response**:

```json
{
    "id": "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
    "quote": "The only limit to our realization of tomorrow is our doubts of today.",
    "author": "Franklin D. Roosevelt",
    "year": 1945
}
```

### 3. Create a New Quote

**Endpoint**: `POST /quotes`

**Description**: Creates a new quote and assigns a unique serialized ID to it.

**Request Body**:

- **`quote`**: The text of the quote (required).
- **`author`**: The name of the person who said the quote (required).
- **`year`**: The year the quote was said or published (optional).

**Response**:

- **Status**: `201 Created`
- **Body**: The newly created quote object, including its ID.

**Example Request**:

```bash
POST http://localhost:3000/quotes
```

**Request Body**:

```json
{
    "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "author": "Winston Churchill",
    "year": 1941
}
```

**Example Response**:

```json
{
    "id": "9f3b2c1d-6e7f-8g9h-0i1j-k2l3m4n5o6p7",
    "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "author": "Winston Churchill",
    "year": 1941
}
```

### 4. Update an Existing Quote by ID

**Endpoint**: `PUT /quotes/:id`

**Description**: Updates an existing quote identified by its unique serialized ID.

**Parameters**:

- **`id`**: The serialized ID of the quote (UUID format).

**Request Body**:

- **`quote`**: The updated text of the quote (optional).
- **`author`**: The updated name of the person who said the quote (optional).
- **`year`**: The updated year the quote was said or published (optional).

**Response**:

- **Status**: `200 OK` if the update was successful.
- **Body**: The updated quote object.
- **Status**: `404 Not Found` if the quote does not exist.

**Example Request**:

```bash
PUT http://localhost:3000/quotes/9f3b2c1d-6e7f-8g9h-0i1j-k2l3m4n5o6p7
```

**Request Body**:

```json
{
    "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "author": "Winston S. Churchill",
    "year": 1942
}
```

**Example Response**:

```json
{
    "id": "9f3b2c1d-6e7f-8g9h-0i1j-k2l3m4n5o6p7",
    "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "author": "Winston S. Churchill",
    "year": 1942
}
```

### 5. Delete a Quote by ID

**Endpoint**: `DELETE /quotes/:id`

**Description**: Deletes a specific quote by its unique serialized ID.

**Parameters**:

- **`id`**: The serialized ID of the quote (UUID format).

**Response**:

- **Status**: `200 OK` if the deletion was successful.
- **Body**: A message confirming the deletion.
- **Status**: `404 Not Found` if the quote does not exist.

**Example Request**:

```bash
DELETE http://localhost:3000/quotes/9f3b2c1d-6e7f-8g9h-0i1j-k2l3m4n5o6p7
```

**Example Response**:

```json
{
    "message": "Quote deleted successfully"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of failures. Common error responses include:

- **`400 Bad Request`**: Returned when required fields are missing in the request body.
- **`404 Not Found`**: Returned when a quote with the specified ID does not exist.
- **`500 Internal Server Error`**: Returned when there is a server-side error.

## Running the API

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **npm**: The Node package manager is required to install dependencies.

### Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/quotes-api.git
    cd quotes-api
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Start the Server**:

    ```bash
    node app.js
    ```

    The server will start on `http://localhost:3000`.

### Testing the API

You can test the API using Postman or any other REST client by sending requests to the endpoints mentioned above.

## Conclusion

The Quotes API provides a simple yet powerful way to manage a collection of quotes with support