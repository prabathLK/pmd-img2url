# pmd-img2url

A smart, self-hosted image microservice created by **Prabath Kumara** for the **PRABATH-MD WhatsApp Bot**.

This service uses a sophisticated stack (Express, MongoDB, Cloudflare R2) to provide a stable, fast, and auto-managing image hosting solution.

## Features

-   **Smart Storage:** Uses Cloudflare R2 for free, unlimited bandwidth (egress).
-   **Auto-Cleanup:** A `node-cron` job automatically deletes any image that hasn't been accessed (viewed) in over 30 days, keeping storage usage low.
-   **Database Tracking:** Uses MongoDB (Mongoose) to track image metadata and access dates.
-   **Strict Limits:** Enforces a **2MB file size limit** to optimize storage.
-   **Stats Dashboard:** A live dashboard shows service statistics.

## Tech Stack

-   **Backend:** Express.js
-   **Database:** MongoDB (with Mongoose)
-   **Storage:** Cloudflare R2 (S3-compatible)
-   **Deployment:** Koyeb (or any Node.js host)

## Self-Hosting

You can deploy your own instance of `pmd-img2url`.

### 1. Prerequisites

-   A MongoDB Database (you can get one free from Koyeb or MongoDB Atlas)
-   A Cloudflare R2 Bucket (free 10GB tier)
-   A Node.js hosting platform (like Koyeb)

### 2. Setup

1.  Clone this repository:
    ```bash
    git clone [https://github.com/your-username/pmd-img2url.git](https://github.com/your-username/pmd-img2url.git)
    cd pmd-img2url
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file (copy from `.env.example`) and fill in your keys:

    ```env
    PORT=8080

    # Your MongoDB Connection String
    MONGODB_URI=mongodb+srv://...

    # Cloudflare R2 Credentials
    R2_ENDPOINT=https_YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
    R2_ACCESS_KEY_ID=YOUR_R2_ACCESS_KEY
    R2_SECRET_ACCESS_KEY=YOUR_R2_SECRET_KEY
    R2_BUCKET_NAME=YOUR_BUCKET_NAME

    # Your app's public URL
    BASE_URL=[https://pmd-img2url.koyeb.app](https://pmd-img2url.koyeb.app)
    ```

### 4. Deploy

Push the project to your GitHub and deploy it on a service like Koyeb, making sure to add the environment variables from your `.env` file to the Koyeb service settings.

---

*Created by Prabath Kumara.*
