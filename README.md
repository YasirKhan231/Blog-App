# Medium-like App

This project is a Medium-like application that allows users to create an account, sign in, and manage blog posts. It features user authentication and password hashing to ensure secure access. The application uses a Cloudflare Worker with a Prisma Client for database interactions and `bcryptjs` for password hashing.

## Features

- **User Signup:** Allows new users to create an account.
- **User Sign-In:** Allows users to sign in to their account.
- **Blog Management:** Users can create and manage blog posts.

## Technologies Used

- **Hono:** A lightweight web framework for building HTTP applications.
- **Prisma:** An ORM for database interactions.
- **bcryptjs:** A library for hashing passwords.
- **Cloudflare Workers:** Serverless functions for deploying the application.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/)
- [Cloudflare Account](https://www.cloudflare.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/medium-like-app.git
   cd medium-like-app
