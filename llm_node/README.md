# Node.js API Server

## Setup

1. Build the Docker image:
    ```sh
    docker-compose up --build
    ```

## API Endpoints

- `POST /query`
  ```json
  {
    "model": "llama2", // or "mistral"
    "question": "Your question here"
  }
