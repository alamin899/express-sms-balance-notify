# SMS Balance Notify

This project notifies users about their SMS balance using webhook.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- Docker installed on your machine

## Instructions to Run the Project

1. **Clone the Repository:**
    ```bash
    git clone git@github.com:Appnap-Technologies-Ltd/sms-balance-notify.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd sms-balance-notify
    ```

3. **Create Environment File:**
    ```bash
    cp .env.example .env
    ```

4. **Fill in Environment Variables:**

   After creating the environment file `.env` from the provided `.env.example`, fill in the following information:

    ```plaintext
    SLACK_WEB_HOOK_URL=<Your Slack Webhook URL>
    SSL_WIRELESS_API_TOKEN=<Your SSL Wireless API Token>
    SSL_WIRELESS_CSMS_IDS=<Your SSL Wireless CSMS IDs>
    ```
5. **Install Dependencies:**
    ```bash
    npm install
    ```

6. **Build Docker Image:**
    ```bash
    docker build -t <image-name> .
    ```

7. **Run Docker Container:**
    ```bash
    docker run -p 3001:3000 -d <image-name>
    ```

These instructions will clone the project, set up the environment file, fill in the necessary information, install dependencies, build the Docker image, and run a Docker container based on that image.
