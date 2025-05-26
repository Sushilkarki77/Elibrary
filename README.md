# AI Powered E -Library

This is a full-stack web application built with a **React** frontend and a **Node.js Express** backend. The project is structured with both the frontend and backend in separate subdirectories.

## 📁 Project Structure

```
.
├── backend/       # Node.js + Express API
├── frontend/      # React application
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn

---

### 🔧 Backend Setup (Express)

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The backend server will run on [http://localhost:5000](http://localhost:5000) by default.

---

### 🎨 Frontend Setup (React)

1. Open a new terminal and navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The frontend app will run on [http://localhost:3000](http://localhost:3000) by default.

---

## 🌐 Connecting Frontend to Backend

To connect the React app to the Express API, make sure API requests in your frontend point to `http://localhost:5000` or configure a proxy in `frontend/package.json`:

```json
"proxy": "http://localhost:5000"
```

---

## 📦 Production Build

To create a production build of the React frontend:

```bash
cd frontend
npm run build
```

You can then serve it with any static server or integrate it into the backend if desired.

---

## 🧪 Testing

You can add tests to both frontend and backend using preferred tools like:

- **Frontend**: Jest, React Testing Library
- **Backend**: Mocha, Chai, Supertest

---

## 📄 License

This project is licensed under the MIT License.
