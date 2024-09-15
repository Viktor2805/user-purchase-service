# User & Purchase Service

## Setup

This project manages users, purchases, and handles external requests like analytics and astrological reports.

### Start Docker containers
docker-compose up -d 

### Install npm dependencies
npm install

### Run database migrations
npm run migration:run

### Start the application
npm run start 

## Features
1. **Create User**: Stores user info in PostgreSQL.
2. **Create Purchase**: 
   - Stores purchase in PostgreSQL.
   - Sends event to an analytics service (fake HTTP request).
   - Sends astrological report after 24 hours (scheduled task).

## Tech Stack
- **NestJS**
- **PostgreSQL** with **TypeORM**
- **Axios**: Simulate external HTTP requests
- **@nestjs/schedule**: For scheduling tasks

## API Endpoints

### 1. **Create User**
- **Route**: `POST /users`
- **Input**:
  - `email` (string)
  - `marketingData` (boolean, optional)
- **Description**: Adds a user to the database.

### 2. **Create Purchase**
- **Route**: `POST /purchases`
- **Input**:
  - `userId` (UUID)
  - `offerId` (UUID)
- **Description**: Stores the purchase, sends analytics event, and schedules a report.

### 2. **Create Offer**
- **Route**: `POST /offers`
- **Input**:
  - `name` (string)
  - `price` (number)
- **Description**: Adds a offer to the database.

