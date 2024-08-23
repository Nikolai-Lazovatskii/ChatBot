# Chat Application
## Overview

The Chat Application is a robust and scalable real-time messaging platform designed for seamless communication between users. This project leverages modern web technologies to provide a responsive and intuitive user experience across various devices. Built with a focus on maintainability and extensibility, this application is ideal for both personal projects and enterprise-level solutions.
## Key Features

- **Real-Time Messaging:** Users can exchange messages instantly with real-time updates.
- **User Authentication:** Secure user registration and login system with password hashing.
- **Responsive Design:** Fully responsive UI/UX optimized for mobile and desktop devices.
- **User Search and Filtering:** Efficiently search and filter through user lists to initiate conversations.
- **Persistent Conversations:** Stores conversation history, allowing users to retrieve past messages.
- **Scalable Backend:** The backend is built to scale, accommodating a growing user base.

## Technology Stack

### Frontend:
- React.js: For building interactive user interfaces.
  - CSS Modules: Modular and scoped styling for better maintainability.
  - Vite: Blazing fast build tool for modern web applications.

### Backend:
  - PHP (XAMPP): Server-side scripting and API development.
  - MySQL: Relational database management for storing user and message data.
  - RESTful API: For communication between the frontend and backend.

### Tools & Services:
  - Git & GitHub: Version control and collaboration.
  - XAMPP: Cross-platform web server solution.
  - ESLint: Linting tool for maintaining code quality.

## Architecture

### The application follows a client-server architecture:

  - Frontend communicates with the backend via RESTful APIs to fetch and update data.
  - Backend is responsible for handling authentication, data processing, and serving the frontend.
  - Database layer manages user data, authentication details, and message history.

## Installation and Setup
### Prerequisites

## Requirements

- **Node.js and npm** (for frontend)
- **XAMPP** (for backend)

## Frontend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/Chat.git
    cd Chat/frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

## Backend Setup

1. Place the backend code in your XAMPP `htdocs` directory. This is necessary for the PHP scripts to be executed properly.
2. Start Apache and MySQL from the XAMPP Control Panel.
3. Import the database from `database/chat.sql`.
4. Configure the database connection in `config.php`.

## Running the Application

1. Access the application by navigating to `http://localhost:<frontend_port>` in your web browser.
2. The backend PHP scripts and APIs should be running from `http://localhost/chat`.

## Usage

- **User Registration:** Create an account to start using the chat.
- **User Login:** Log in with your credentials.
- **Search Users:** Use the search bar to find users and start a conversation.
- **Send Messages:** Click on a user to open a chat window and start messaging.

## Contribution Guidelines

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## Future Enhancements

- **Group Chats:** Add functionality for group conversations.
- **Media Sharing:** Enable sharing of images, videos, and other files.
- **Push Notifications:** Implement real-time notifications for new messages.
- **Themes:** Allow users to switch between different themes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
