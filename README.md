# 🔐 Passport.js Authentication Blog System

A robust Node.js web application featuring user authentication, session storage in MongoDB, and protected routes using **Passport.js (passport-local)**, **Express.js**, and **EJS templates**.

---

## 🚀 Features

- **User Authentication**: Secure Login & Registration using `Passport.js`.
- **Password Encryption**: Hashed passwords stored using `bcryptjs`.
- **Session Management**: Persistent user sessions stored directly in MongoDB via `connect-mongo`.
- **Protected Routes**: Middleware authorization (`ensureAuthenticated`, `forwardAuthenticated`).
- **Templating Engine**: Dynamic frontend rendering with `EJS`.

---


## 📸 Output / Screenshots

![Register Page](public/image/register.png)


## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: Passport.js, passport-local, bcryptjs
- **Session Store**: express-session, connect-mongo
- **Views**: EJS (Embedded JavaScript)

---

## 📁 Project Structure

```text
passport/
├── config/
│   └── passport.js          # Passport Local Strategy setup
├── middleware/
│   └── authMiddleware.js    # Authentication verification middleware
├── models/
│   ├── blog.js              # Blog Mongoose Schema
│   └── User.js              # User Mongoose Schema
├── routes/
│   ├── authRoutes.js        # Auth Endpoints (/login, /register, /logout)
│   └── blogRoutes.js        # Protected Blog Endpoints (/blogs)
├── views/
│   ├── blogs.ejs            # Blogs dashboard view
│   ├── login.ejs            # Login interface
│   └── register.ejs         # User registration interface
├── .env                     # Environment variables
├── app.js                   # Application entry point
└── package.json             # Dependencies and scripts