# Django LLM Program

## Setup

1. Build the Docker image:
    ```sh
    docker build -t llm-django-app .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 8000:8000 llm-django-app
    ```

## API Endpoints

- `POST /api/select_model`
  ```json
  {
    "model": "llama2" // or "mistral"
  }
