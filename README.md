# Blog App

![App Screenshot](/images/app-screenshot.png)

Welcome to the Blog App repository! This application is a simple blog platform built using Node.js and Express.js. It utilizes a JSON file as a database for storing blog posts. The project incorporates several libraries and tools to enhance its functionality, including multer, passport.js, ejs, bcrypt, i18next, marked (for rendering Markdown blog content), winston for logging, and moment for managing dates.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Before you dive into the code, make sure you have the following prerequisites installed:

- Node.js: You can download it [here](https://nodejs.org/).

Once you have Node.js installed, clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/blog-app.git
```

## Features

- User authentication with Passport.js
- Create, read, update, and delete blog posts
- Markdown support for writing blog content
- Secure password hashing with Bcrypt
- Internationalization (i18n) support with i18next
- Logging using Winston
- Date and time formatting with Moment.js
- Environment variables configuration with Dotenv

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/my-blog-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd my-blog-app
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```
4. Create a .env file in the project root and add your SESSION_SECRET:
   ```bash
   SESSION_SECRET=your-secret-key
   ```

## Usage

To start the application, run the following command in your terminal:

```
npm start
```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository's main branch.
