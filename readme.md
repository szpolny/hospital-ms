# Hospital Management Service

This is a Deno-based Hospital Management Service API built with the Oak
framework and Drizzle ORM. It provides endpoints for managing patients, doctors,
and appointments in a hospital system.

## Features

- **Patient Management**: Create, retrieve, and manage patient records.
- **Doctor Management**: Manage doctor profiles and specializations.
- **Appointment Scheduling**: Schedule and manage appointments between patients
  and doctors.

## Prerequisites

- [Deno](https://deno.land/) installed on your system.
- SQLite database (default file: `hospital.db`).

## Setup Instructions

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd hospital-ms
   ```

2. Install dependencies:

   ```sh
   deno task dev
   ```

3. **Path `@libsql/client` for Deno compatibility:** Run the following command
   to patch the `@libsql/client` package (provided by
   [this repo](https://github.com/davesteinberg/deno-drizzle-turso)):
   ```sh
   sed -i -e 's/"deno"/"no-deno"/' node_modules/@libsql/client/package.json
   ```

4. Configure environment variables: Create a .env file in the root directory and
   set the following variables (default values are provided):
   ```sh
   DATABASE_PATH=file:hospital.db
   PORT=8000
   ```

5. Push the database schema to SQLite:
   ```sh
   deno task db:push
   ```

6. Start the development server:
   ```sh
   deno task dev
   ```

   The server will start on http://localhost:8000.
