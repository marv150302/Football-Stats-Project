![logo.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/84468105-900f-4df1-9369-1908a930a842/a66e90b1-4b15-4c07-88cb-a5d09e2ed9cf/logo.png)

# Description

The website provides football fans with access to game results, competition information, player information, and chat rooms for team discussions.

 It also includes advanced data analysis with  Jupyter Notebook.

# Architecture

### Servers

- **Express Main Server**: Acts as the central server handling user queries and communication with other servers.
- **Express Second Server:** Provides data from the mongoDb database
- **Java Spring Boot Server**: Provides Data from the PostgreSQL database

### Databases

- **MongoDB**: Stores dynamic data with a fast change rate (e.g., game scores).
- **Postgres**: Stores more static data (e.g., player information, competitions).

### Additional Components

- **Socket.io**: Implements a chat system among fans and pundits for real-time discussion.

### Functionalities

- **Web Interface**: Built using HTML, Javascript, and CSS, enabling users to query and explore football data.
- **Large Scale Data Analytics**: Utilizes Jupyter Notebooks for in-depth analysis of selected data subsets.

# Project Structure

1. **Frontend Files (public folder)**:
    - HTML, CSS, and JavaScript files are located in the `public` folder.
    - JavaScript files specific to frontend functionalities are in `public/javascripts`.
2. **Backend Structure**:
    - **Express Main Server**: Handles routing and communication with other servers.
        - Located in its own project.
    - **Spring Boot Server**:
        - Uses `application.properties` for Postgres database configuration.
        - Located in its own project.
    - **Express Second Server**:
        - Handles additional backend functionalities, including real-time features.
        - Configuration for MongoDB located in `databases` folder.
        - Located in its own project.
3. **Database Configurations**:
    - **Postgres (Spring Boot)**:
        - Configured through `application.properties` in the Spring Boot project.
    - **MongoDB (Express)**:
        - Credentials and configuration located in the `databases` folder within the Express project.
4. **Jupyter Notebooks**:
    - **Location**: Hosted in a separate project.
    - **Functionality**: Users can select and visualize advanced statistics by generating queries from a web interface.
    - **Setup**: Pip is used to install required libraries if they're not already installed.
5. **Interaction Between Servers**:
    - Servers communicate via defined routes to exchange data and perform specific tasks.
6. **Additional Assets**:
    - Static assets such as images, fonts, etc., are stored in appropriate directories within `public`.

# Setup Instructions

### Prerequisites

1. **Node.js and npm**:
    - Ensure Node.js and npm are installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
2. **Java Development Kit (JDK)**:
    - Install JDK suitable for your operating system. You can download it from [adoptopenjdk.net](https://adoptopenjdk.net/) or [oracle.com](https://www.oracle.com/java/technologies/javase-downloads.html).
3. **Python and pip**:
    - Install Python from [python.org](https://www.python.org/). Pip should be installed automatically with Python. Make sure Python is added to your system's PATH.
4. **MongoDB**:
    - Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community).
5. **PostgreSQL**:
    - Install PostgreSQL database from [postgresql.org](https://www.postgresql.org/download/).

### Project Setup

1. **Clone the Repositories**:
    - Clone the following repositories for each server:
        - Main Express Server (for views and primary routing)
        - Secondary Express Server (for MongoDB interactions)
        - Java Spring Boot Server (for PostgreSQL interactions)
        - Jupyter Notebooks (for advanced data analytics)
2. **Setting up Main Express Server**:
    - Navigate to the Main Express Server project directory.
    - Install dependencies:
        
        ```bash
        bashCopy code
        cd main-express-server
        npm install
        
        ```
        
    - Start the server:
        - If using command line:
            
            ```sql
            sqlCopy code
            npm start
            
            ```
            
        - If using IntelliJ IDEA or WebStorm:
            - Open the project in IntelliJ IDEA or WebStorm.
            - Navigate to the `package.json` file.
            - Right-click on the `start` script and select "Run".
            - Access the web interface in your browser at `http://localhost:3000`.
3. **Setting up Secondary Express Server**:
    - Navigate to the Secondary Express Server project directory.
    - Install dependencies:
        
        ```bash
        bashCopy code
        cd secondary-express-server
        npm install
        
        ```
        
    - Update MongoDB credentials in the appropriate configuration file (`databases/config.js`).
    - Start the server:
        - If using command line:
            
            ```sql
            sqlCopy code
            npm start
            
            ```
            
        - If using IntelliJ IDEA or WebStorm, follow similar steps as for the Main Express Server.
4. **Setting up Java Spring Boot Server**:
    - Navigate to the Java Spring Boot Server project directory.
    - Ensure `application.properties` has correct configurations for PostgreSQL.
    - Build and run the application:
        - If using command line:
            
            ```bash
            bashCopy code
            cd spring-boot-server
            mvn clean package
            java -jar target/application.jar
            
            ```
            
        - If using IntelliJ IDEA:
            - Open the project in IntelliJ IDEA.
            - Build the project (`Build` > `Build Project`).
            - Run the application by running the main class with Spring Boot application context.

### 5. Setting up Jupyter Notebooks

1. **Clone the Jupyter Notebooks Repository**:
    - Clone the Jupyter Notebooks project repository to your local machine.
2. **Navigate to the Jupyter Notebooks Directory**:
    - Open a terminal or command prompt.
    - Change directory to where you cloned the Jupyter Notebooks project.
3. **Set up a Virtual Environment**:
    - It's recommended to use a virtual environment to manage dependencies:
        
        ```bash
        bashCopy code
        cd jupyter-notebooks
        python -m venv venv
        source venv/bin/activate  # On Windows, use venv\Scripts\activate
        
        ```
        
4. **Start Jupyter Notebook**:
    - Launch Jupyter Notebook:
        
        ```
        Copy code
        jupyter notebook
        
        ```
        
    - This will open Jupyter Notebook in your default web browser.
5. **Access Notebooks**:
    - Access the notebooks by navigating through the directory structure in Jupyter Notebook's interface.

# Database Setup

### MongoDB

1. **Restore MongoDB Schema and Data**:
    - Navigate to the directory containing the MongoDB schema dump (`mongo_database_schema`).
    - Run the following command in your terminal to restore the MongoDB database:
        
        ```bash
        bashCopy code
        mongorestore --db <database_name> <path_to_dump_directory>
        
        ```
        

### PostgreSQL

1. **Prepare PostgreSQL Database**:
    - Start the Java Spring Boot server to ensure that the necessary tables are created in the PostgreSQL database.
2. **Restore PostgreSQL Data**:
    - Open pgAdmin and connect to your PostgreSQL server.
    - Navigate to the database where you want to restore the data.
    - Use the pgAdmin interface to restore the data from the `postgre_Database_schema` file.
    - Note: When restoring, only restore the data, not the schema. The restoration process might display a failure message, but the data will have been successfully imported.

### Additional Notes

- **For Users with IntelliJ IDEA, WebStorm, and PyCharm**:
    - IntelliJ IDEA and WebStorm offer integrated tools for managing Node.js, Java, and Python projects, providing an easier setup and management experience through their GUI. You can run npm scripts, build Java projects, and manage Python environments directly within these IDEs.
- **For Users Without IntelliJ IDEA, WebStorm, or PyCharm**:
    - You can still set up and run the project using command line instructions provided. Ensure all dependencies are installed and configurations are correctly set up as per the instructions above.
- **Ensure All Servers Are Running Simultaneously**:
    - Properly configure database connections and environment variables across all servers (`Main Express Server`, `Secondary Express Server`, `Java Spring Boot Server`) for seamless interaction and functionality.

# Usage

### Accessing the Web Interface

1. **Accessing the Web Interface**:
    - Open your web browser and navigate to `http://localhost:3000` (assuming default port).
    - You will be greeted with the main page where you can start interacting with the football data.

### Specific Functionalities and Features

1. **Specific Functionalities**:
    - **Querying Data**: Use the interface to query and explore football data stored in MongoDB and PostgreSQL.
    - **Advanced Analytics**: For detailed statistical analysis, use the integrated Jupyter Notebooks to visualize and analyze data subsets.

### Using the Chat System

1. **Using the Chat System**:
    - The chat system allows fans and pundits to engage in real-time discussions in topic-based rooms.
    - To use the chat system:
        - Navigate to the designated chat section on the web interface.
        - Choose a room (e.g., Juventus Room, English Premiership Room) to join.
        - Start typing messages and engage with other users participating in the chat.

# Limitations

### Exceptional Situations and Extensibility

- **Data Completeness**: The dataset lacks additional basic information that could enhance the website's functionality and user experience.
- **User Login/Registration**: Currently, user login and registration functionalities (POST requests) are not implemented, allowing any user to access the chat function without authentication.
- **Data Persistence**: Messages in the chat system are not stored in a database, resulting in the lack of chat history for users.
- **Data Insertion**: POST request functions for updating data are intentionally omitted.
- **Statistical Display**: Users need to navigate to separate pages from the main website to compare statistics across multiple competitions, players, or clubs, rather than having integrated comparative features.

### Future Improvements

These limitations present opportunities for future enhancements and improvements to the project:

- **Enhanced Data Collection**: Adding more updated data to the dataset would enrich the website's content , providing users with more relevant information.
- **Implement User Authentication**: Introducing user login and registration features would enhance security and personalize user experiences, especially for interactive features like the chat system.
- **Persistent Chat History**: Implementing a database solution to store chat messages would allow users to view previous conversations and maintain continuity in discussions.
- **Automated Data Updates**: Developing automated processes or scheduled tasks for data insertion and updates could ensure that the website's content reflects the latest information without manual intervention.
- **Integrated Statistical Tools**: Enhancing the website to include interactive and comparative statistical displays within the main pages would improve user accessibility and engagement with analytical insights.
