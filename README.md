# Auth api (Riley)

This API is developed using the MVC (Model-View-Controller) architecture pattern to manage user login and registration. The API provides endpoints for user registration, authentication, and other user management operations.

## Installation

Follow these steps to set up and run the API in your local environment:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/gguedes14/auth-api.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd auth-api
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   ```

4. **Configure environment variables**:
   Create a `env.json` file in the root of the project and add the necessary variables, such as database credentials and secret keys for authentication. Example:

   ```json
   {
     "local": {
       "APP_ENV": "local",
       "JWT_TOKEN": "token",
       "DB_HOST": "localhost",
       "DB_PORT": 5432,
       "DB_USER": "user",
       "DB_PASSWORD": "pass",
       "DB_NAME": "dbname"
     }
   }
   ```

5. **Set up the database with postgres**:
   Run migrations and seeds to set up the database:
   ```bash
   npm run knex:migrate
   ```

## Usage

To start the API, use the command:

```bash
npm run start
```

## Request example:

```url
 http://localhost:2500/users/create
```

```json
{
  "name": "name",
  "last_name": "name",
  "user_id": "name.example", # optional
  "email": "email@email.com",
  "password": "abcde"
}
```
