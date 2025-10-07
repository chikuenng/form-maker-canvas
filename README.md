# Form Maker - Canvas

A modern form builder application with canvas functionality, built with React frontend, Node.js backend, and MySQL database.

## Architecture

This project uses a three-tier architecture:

- **Frontend**: React with TypeScript (Port 3000)
- **Backend**: Node.js with Express (Port 3001)
- **Database**: MySQL 8.0 (Port 3306)

## Quick Start with Docker

### Prerequisites

- Docker and Docker Compose installed
- Git

### Running the Application

1. **Clone and navigate to the project:**

   ```bash
   git clone <your-repo-url>
   cd "Form Maker - Canvas"
   ```

2. **Start all services:**

   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: localhost:3306

### Services

#### Frontend (React + TypeScript)

- **Port**: 3000
- **Technology**: React 18, TypeScript, CSS3
- **Features**: Modern UI, responsive design, API integration

#### Backend (Node.js + Express)

- **Port**: 3001
- **Technology**: Node.js, Express, MySQL2
- **API Endpoints**:
  - `GET /health` - Health check
  - `GET /api/canvas` - Get all canvas items
  - `POST /api/canvas` - Create new canvas item
  - `PUT /api/canvas/:id` - Update canvas item
  - `DELETE /api/canvas/:id` - Delete canvas item

#### Database (MySQL 8.0)

- **Port**: 3306
- **Database**: FormMaker
- **User**: admin
- **Password**: Bng20071962!

## Development

### Running Individual Services

#### Backend Only

```bash
cd backend
npm install
npm run dev
```

#### Frontend Only

```bash
cd frontend
npm install
npm start
```

#### Database Only

```bash
docker-compose up database
```

### Database Schema

The application includes the following tables:

- **Canvas**: Stores canvas items and elements
- **Users**: User management
- **Forms**: Form definitions
- **FormElements**: Individual form elements

### API Documentation

#### Canvas Items

**Get all canvas items:**

```bash
curl http://localhost:3001/api/canvas
```

**Create new canvas item:**

```bash
curl -X POST http://localhost:3001/api/canvas \
  -H "Content-Type: application/json" \
  -d '{"Name": "New Form", "Type": "form", "Width": 400, "Height": 300}'
```

**Update canvas item:**

```bash
curl -X PUT http://localhost:3001/api/canvas/1 \
  -H "Content-Type: application/json" \
  -d '{"Name": "Updated Form", "Type": "form", "Width": 500, "Height": 400}'
```

**Delete canvas item:**

```bash
curl -X DELETE http://localhost:3001/api/canvas/1
```

## Docker Commands

### Build and Start

```bash
docker-compose up --build
```

### Start in Background

```bash
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f
```

### Rebuild Specific Service

```bash
docker-compose up --build backend
```

### Database Management

```bash
# Connect to database
docker-compose exec database mysql -u admin -p FormMaker

# Backup database
docker-compose exec database mysqldump -u admin -p FormMaker > backup.sql

# Restore database
docker-compose exec -T database mysql -u admin -p FormMaker < backup.sql
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 3001, and 3306 are available
2. **Database connection**: Wait for database to fully initialize (30 seconds)
3. **Frontend not loading**: Check if backend is running on port 3001

### Reset Everything

```bash
docker-compose down -v
docker-compose up --build
```

### Check Service Status

```bash
docker-compose ps
```

## Project Structure

```
Form Maker - Canvas/
├── docker-compose.yml          # Docker services configuration
├── backend/                    # Backend service
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js           # Main server file
│       ├── config/             # Database configuration
│       ├── models/              # Data models
│       └── routes/              # API routes
├── frontend/                   # Frontend service
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── App.tsx             # Main React component
│       ├── App.css             # Styling
│       └── index.tsx           # Entry point
└── database/
    └── init/
        └── 01-init.sql        # Database initialization
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## License

This project is licensed under the ISC License.
