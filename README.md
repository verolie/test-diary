# test-diary
In this project I am using Laravel for the backend and React.js for the frontend. I am using jwt for the backend Authentication and for the frontend I am using tailwind for the framework.

## Backend Setup
you can start with the backend first:
Before running the commands below, ensure that you have a MySQL database set up and configured in the .env file.
Example .env Database Configuration
```
//env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3636
DB_DATABASE=oracle
DB_USERNAME=root
DB_PASSWORD=oracle
DB_OPTIONS="?allowPublicKeyRetrieval=true"

```
Running the Backend
```
cd backend-diary
npm migrate
php artisan serve
```
for the example of the request you can import the test-diary.postman_collection to your postman
## Frontend Setup
this is the command that you have to run:"
```
cd frontend-diary
npm install
npm run dev
```
