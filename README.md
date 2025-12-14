# Whiz POS Website

The official website for Whiz POS, built with **Node.js**, **Express**, and **EJS**.

## Features

- **Landing Page**: Modern, responsive design (Light Theme).
- **Windows POS**: Protected download (Admin verification required).
- **Mobile App**: Public APK download with connection guide.
- **Back Office**: Login and dashboard information.
- **Admin Dashboard**: Manage user access requests.
- **Authentication**: Secure login/register flow using JWT.

## Prerequisites

- Node.js (v14+)
- MongoDB (Running locally or cloud URI)

## Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    - Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    - Update `MONGODB_URI` and other variables in `.env`.

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3000`.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates), Tailwind CSS (via CDN)
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcryptjs
