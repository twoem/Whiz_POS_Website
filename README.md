# Whiz POS Website

The official website for Whiz POS, built with **Node.js**, **Express**, and **EJS**.

## Features

- **Landing Page**: Modern, responsive design (Light Theme).
- **Windows POS**: Protected download (Admin verification required).
- **Mobile App**: Public APK download with connection guide.
- **Back Office**: Login and dashboard information.
- **Admin Dashboard**: Manage user access requests (Approve/Reject).
- **Authentication**: Secure login/register flow using JWT, with password reset functionality.
- **Notifications**: Automated emails for welcome, approval, rejection, and password reset.

## Prerequisites

- Node.js (v14+)
- MongoDB (Running locally or cloud URI)

## Installation

1.  Clone the repository.

### Main Application
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

### Email Microservice
The email functionality is handled by a separate microservice located in `email-service`.

1.  Navigate to the directory:
    ```bash
    cd email-service
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    - Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    - Update SMTP settings in `.env`.

## Environment Variables

### Main Application (`.env`)

```ini
PORT=3000
MONGODB_URI=mongodb://localhost:27017/whizpos
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@whizpos.com
ADMIN_NAME=Admin
ADMIN_PASSWORD=password
NEXT_PUBLIC_ADMIN_PHONE=+1234567890
DOWNLOAD_LINK_WINDOWS=https://example.com/installer.exe
NEXT_PUBLIC_DOWNLOAD_LINK_APK=https://example.com/app.apk
EMAIL_MICROSERVICE_URL=http://localhost:3001
```

### Email Microservice (`email-service/.env`)

```ini
PORT=3001
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASS=pass
EMAIL_FROM="Whiz POS" <no-reply@whizpos.com>
REPLY_TO=support@whizpos.com
LOGO_URL=https://example.com/logo.png
```

## Running the Application

### Development

1.  Start the Email Microservice:
    ```bash
    cd email-service
    npm start
    ```

2.  Start the Main Application (in a new terminal):
    ```bash
    npm run dev
    ```

The main server will start on `http://localhost:3000` and the email service on `http://localhost:3001`.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates), Tailwind CSS (via CDN)
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcryptjs
- **Email**: Nodemailer (Microservice)
