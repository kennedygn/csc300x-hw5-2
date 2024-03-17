# Jokebook API Documentation

## Jokebook Categories

Returns a list of possible categories in the jokebook.

- **Request Format:** `GET /jokebook/categories`
- **Returned Data Format:** JSON
- **Description:** This endpoint returns a list of categories available in the jokebook.
- **Example Request:** `GET /jokebook/categories`
- **Example Response:** 
    ```json
    ["funnyJoke", "lameJoke"]
    ```
- **Error Handling:** N/A

## Jokes in a Category

Returns jokes from a specified category.

- **Request Format:** `GET /jokebook/joke/:category?limit=:limit`
- **Returned Data Format:** JSON
- **Description:** This endpoint returns jokes from the specified category. An optional query parameter `limit` can be used to limit the number of jokes returned.
- **Example Request:** `GET /jokebook/joke/funnyJoke?limit=2`
- **Example Response:** 
    ```json
    [
        {"joke": "Why did the student eat his homework?", "response": "Because the teacher told him it was a piece of cake!"},
        {"joke": "What kind of tree fits in your hand?", "response": "A palm tree"}
    ]
    ```
- **Error Handling:** If the category is not valid, it responds with `{'error': 'no category listed for [category]'}`.

## Add a New Joke

Adds a new joke to the jokebook.

- **Request Format:** `POST /jokebook/joke/new`
  - **Body Parameters:**
    - `category`: The category of the joke (either 'funnyJoke' or 'lameJoke').
    - `joke`: The joke text.
    - `response`: The response to the joke.
- **Returned Data Format:** JSON
- **Description:** This endpoint adds a new joke to the specified category in the jokebook.
- **Example Request:** 
    ```json
    POST /jokebook/joke/new
    {
        "category": "funnyJoke",
        "joke": "Why don't scientists trust atoms?",
        "response": "Because they make up everything!"
    }
    ```
- **Example Response:** 
    ```json
    {
        "message": "Joke added successfully",
        "updatedJokes": [
            {"joke": "Why did the student eat his homework?", "response": "Because the teacher told him it was a piece of cake!"},
            {"joke": "What kind of tree fits in your hand?", "response": "A palm tree"},
            {"joke": "Why don't scientists trust atoms?", "response": "Because they make up everything!"}
        ]
    }
    ```
- **Error Handling:** If any of the required parameters is missing or the category is invalid, it responds with `{'error': 'invalid or insufficient user input'}`.
