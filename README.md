# Bootcamp

## Stage 1: Downloading appropriate programmes

- Download VS Code https://code.visualstudio.com/download
- Download IntelliJ (Community Edition) https://www.jetbrains.com/idea/download/?section=windows
- Download Github desktop https://desktop.github.com/
- Install NodeJS https://nodejs.org/en/download (including additional dependencies in script)

## Stage 2: Downloading the Repo

1. Navigate to http://deloittegithub.com/
2. Login using your deloitte account
3. Click Github Signin in the top menu bar
4. Navigate to your teams repository
5. Open Github desktop, click sign in with Github account
6. Clone the bootcamp repository

## Stage 3: Opening the project

### Stage 3a: Running the front end

1. Open the webapp folder using VS Code
2. Run `npm install`
3. Create a `.env` file in the root directory of webapp and Copy/Paste this line:
   ```
   REACT_APP_BACKEND_URL="localhost:8080"
   ```
4. Run `npm run dev`

### Stage 3b: Create the database

1. Open Docker desktop
2. Open the terminal on the root folder of the project
3. Run: `docker-compose up -d --build`
4. You should see the database container created and started

### Stage 3c: Running the back end

1. Open existing project in IntelliJ and choose the api folder
2. From Project structure make sure that the chosen SDK is 21
3. Create a `.env` file in the directory of the backend, and type in the environment variables that will be communicated by the instructor (DB_URL, DB_USERNAME, DB_PASSWORD)
4. Navigate to the right-hand side of the IntelliJ IDEA window and click on the "Maven" tab to open the Maven tool window. If you don't see the Maven tab, you can enable it by going to View > Tool Windows > Maven
5. In the Maven tool window, locate your project. You will see a list of Maven goals and lifecycle phases
6. Expand the "Lifecycle" node in the Maven tool window
7. Click on "clean" then wait until success then click on "install"
8. Navigate to the ApiApplication class and run the application
