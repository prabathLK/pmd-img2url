# 🚀 pmd-img2url

<p align="center">
  <strong>A smart, self-hosted image microservice for the PRABATH-MD WhatsApp Bot.</strong>
  <br>
  Created by <a href="https://md.prabath.site" target="_blank">Prabath Kumara</a>
</p>

<p align="center">
  <a href="https://pmd-img2url.koyeb.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Dashboard-Open-blue?style=for-the-badge&logo=koyeb&logoColor=white" alt="Live Preview">
  </a>
</p>

> This is not just a simple image host; it's a "smart" microservice built on a modern stack (Express, Mongoose, Cloudflare R2). It provides a stable, fast, and auto-managing solution that automatically cleans up old, unused files to keep storage usage minimal.

---

## 🧠 Key Features

* **✅ Smart Storage:** A `node-cron` job automatically deletes any image that hasn't been accessed (viewed) in over 30 days.
* **🔥 Unlimited Bandwidth:** Built on **Cloudflare R2**, which offers **unlimited free bandwidth (egress)**.
* **📊 Live Dashboard:** A clean, "liquid glass" dark-mode dashboard shows live service statistics.
* **🔒 Hard Storage Limit:** Automatically **blocks** new uploads if the **10GB storage quota** is reached, preventing extra charges.
* **⚙️ 2MB File Limit:** Enforces a **2MB file size limit** to optimize storage.

## 💻 Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Cloudflare_R2-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare R2">
  <img src="https://img.shields.io/badge/Koyeb-1F2937?style=for-the-badge&logo=koyeb&logoColor=white" alt="Koyeb">
  <img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
</p>

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

(Instructions for R2, MongoDB, and Koyeb are in the previous chat history. Get your 6 Environment Variables.)

### 3️⃣ Environment Variables (`.env`)

Add these variables to your Koyeb service:

* `PORT=8080`
* `MONGODB_URI` (Your MongoDB connection string)
* `R2_ENDPOINT` (Your R2 S3 API Endpoint)
* `R2_ACCESS_KEY_ID` (Your R2 Access Key)
* `R2_SECRET_ACCESS_KEY` (Your R2 Secret Key)
* `R2_BUCKET_NAME` (Your R2 Bucket Name)
* `R2_PUBLIC_URL` (Your R2 **Public `r2.dev` URL**. Get this from R2 -> Bucket -> Settings)
* `BASE_URL` (Your app's public URL, e.g., `https://pmd-img2url.koyeb.app`)

---

## 🤖 API Endpoints

* `GET /`: Shows the HTML dashboard.
* `POST /upload`: The upload endpoint for your bot. (Expects `multipart/form-data` with a field named `file`).
* `GET /v/:key`: The "smart" view/redirect link.
* `GET /stats`: JSON data for the dashboard.

---

<p align="center">
  Created with ❤️ by <a href="https://md.prabath.site" target="_blank"><strong>Prabath Kumara</strong></a>.
  <br>
  Find out more about PRABATH-MD: <a href="https://md.prabath.site" target="_blank">md.prabath.site</a>
</p>
