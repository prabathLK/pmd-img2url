# 🚀 pmd-img2url

A smart, self-hosted image microservice created by **Prabath Kumara** for the **PRABATH-MD WhatsApp Bot**.

This is not just a simple image host; it's a "smart" microservice built on a modern stack (Express, Mongoose, Cloudflare R2). It provides a stable, fast, and auto-managing solution that automatically cleans up old, unused files to keep storage usage minimal.

## 🧠 Key Features

* **Smart Storage Management:** A `node-cron` job automatically deletes any image that hasn't been accessed (viewed) in over 30 days. Your storage *never* fills up with useless files.
* **🔥 Blazing Fast & Free Bandwidth:** Built on **Cloudflare R2**, which offers **unlimited free bandwidth (egress)**. A million views or a billion views, it's still free.
* **📊 Live Dashboard:** A clean, dark-mode dashboard shows live service statistics:
    * Available Images
    * Total Uploads
    * Total Views
    * Total Auto-Deleted
* **🔒 Secure & Private:** It's *your* service. You control the files.
* **⚙️ Configurable Limits:** Comes preset with a **2MB file size limit** to protect your storage.

## 💻 Tech Stack

* **Backend:** Express.js
* **Database:** MongoDB (with Mongoose)
* **Storage:** Cloudflare R2 (S3-compatible)
* **Hosting:** Koyeb (Recommended)

---

## 🛠️ Self-Hosting Guide

Deploy your own instance of `pmd-img2url`.

### 1️⃣ Prerequisites

You need accounts for the following services (all have free tiers):

1.  [GitHub](https://github.com/) (To deploy from)
2.  [Koyeb](https://www.koyeb.com/) (To host the app)
3.  [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (For the database)
4.  [Cloudflare](https://www.cloudflare.com/) (For R2 storage)

---

### 2️⃣ Step-by-Step Setup

#### Part A: Cloudflare R2 Setup (Storage)

This is the most important step. We will create a "Bucket" (storage folder) and get 4 keys.

1.  **Login to Cloudflare:**
    * Go to your Cloudflare dashboard.
    * On the left-hand menu, find and click **"R2"**.

2.  **Create a Bucket:**
    * Click **"Create bucket"**.
    * **Bucket name:** Give it a unique name (e.g., `pmd-bot-storage`).
    * **Location:** "Automatic" is fine.
    * Click **"Create bucket"**.

3.  **Get your `R2_BUCKET_NAME` and `R2_ENDPOINT`:**
    * After creating the bucket, click its name.
    * On the bucket's page, look for **"S3 API"** (usually on the right).
    * Copy the **`S3 API Endpoint`**. This is your `R2_ENDPOINT`.
        * (e.g., `https://<YOUR_ACCOUNT_ID>.r2.cloudflarestorage.com`)
    * Your `R2_BUCKET_NAME` is the name you just created (e.g., `pmd-bot-storage`).

4.  **Create an API Token (Keys):**
    * Go back to the main "R2" overview page.
    * Click **"Manage R2 API Tokens"** (on the right).
    * Click **"Create API token"**.
    * **Permissions:** Select **"Object Read & Write"**.
    * **Bucket(s):** Apply to "All Buckets" or just the bucket you created.
    * Click **"Create API token"**.

5.  **🚨 COPY YOUR KEYS! 🚨**
    * Cloudflare will show you the keys **ONLY ONCE**. Copy them immediately.
    * `Access Key ID` = Your `R2_ACCESS_KEY_ID`
    * `Secret Access Key` = Your `R2_SECRET_ACCESS_KEY`

You now have all 4 R2 keys!

#### Part B: MongoDB Atlas Setup (Database)

1.  **Login to MongoDB Atlas** and create a new free (M0) cluster.
2.  **Database Access:**
    * Create a new Database User (e.g., `pmdUser`) and save the password.
3.  **Network Access:**
    * Click "Add IP Address" -> **"ALLOW ACCESS FROM ANYWHERE"** (`0.0.0.0/0`).
    * (This is required for Koyeb to connect).
4.  **Get Connection String:**
    * Go to "Database" -> "Connect" -> "Drivers".
    * Copy the **Connection String (URI)**.
    * It will look like: `mongodb+srv://pmdUser:<password>@...`
    * Replace `<password>` with the password you created. This is your `MONGODB_URI`.

#### Part C: Deploy to Koyeb

1.  **Fork / Clone this Repo:**
    * Fork this repository to your own GitHub account.

2.  **Create Koyeb Service:**
    * Login to Koyeb -> "Create Service" -> "Web Service".
    * Select **GitHub** and choose your forked `pmd-img2url` repository.

3.  **Add Environment Variables:**
    * This is the most critical step. Go to the "Environment Variables" section.
    * Click "Add Variable" and add the following keys (as "Secret") from Part A and B:
        * `MONGODB_URI` (Your MongoDB connection string)
        * `R2_ENDPOINT` (Your R2 S3 API Endpoint)
        * `R2_ACCESS_KEY_ID` (Your R2 Access Key)
        * `R2_SECRET_ACCESS_KEY` (Your R2 Secret Key)
        * `R2_BUCKET_NAME` (Your R2 Bucket Name)

4.  **Add `BASE_URL`:**
    * Koyeb will give your app a public URL (e.g., `https://pmd-img2url-prabath.koyeb.app`).
    * Add one more Environment Variable:
        * `BASE_URL` = `https://<YOUR_APP_NAME>.koyeb.app`
    * This `BASE_URL` is needed by the server to create the final shareable link.

5.  **🚀 Deploy!**
    * Click "Deploy". Koyeb will automatically build and start your service.

Your `pmd-img2url` service is now live! Visit your Koyeb URL to see the dashboard.

## 🤖 API Endpoints

* `GET /`: Shows the HTML dashboard.
* `POST /upload`: The upload endpoint for your bot. (Expects `multipart/form-data` with a field named `file`).
* `GET /v/:key`: The "smart" view/redirect link.
* `GET /stats`: JSON data for the dashboard.

---

Created with ❤️ by **Prabath Kumara**.

Find out more about PRABATH-MD: **[md.prabath.site/infomd](https://md.prabath.site/infomd)**
