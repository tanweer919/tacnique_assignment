# Quiz App

Full-stack quiz application with Django REST backend and React frontend.

## Tech Stack

- **Backend**: Django + Django REST Framework + PostgreSQL
- **Frontend**: React + Vite + Tailwind CSS

## Prerequisites

- Python 3.10+
- Node.js 22+
- PostgreSQL

## Backend Setup

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Create and activate virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the `backend/` directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

### 5. Run database migrations

```bash
python manage.py migrate
```

### 6. Create a superuser (optional)

```bash
python manage.py createsuperuser
```

### 7. Start the backend server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

---

## Frontend Setup

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables (optional)

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Running Both Servers

Open two terminal windows:

**Terminal 1 - Backend:**

```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

---

## License

MIT
