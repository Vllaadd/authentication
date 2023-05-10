# User Authoentication

## Description 
This project focuses on user authentication and provides functionality for user registration, login, profile updates, and profile deletion. It aims to securely manage user credentials and allow users to interact with their profiles through various API endpoints. 

## Tack Stack 
    1. HTML
    2. CSS
    3. JavaScript 
    4. MERN 

## Methods Used 
    • **.create()** - Used to create a new user in the database using hte User model 
    • **.json()** - used to send a JSON response back to the client after successfully creating a user 
    • **.findOne()** - used to search for a user in thedatabse based on the provided "username" and "password" 
    • **.deleteOne()** - function provided by Mongoose used to delete a single document

## Usage 
    1. Register: Create your account by providing a unique username and password 
    2. Log In: Sign in to your account using your regsitered username and password 
    3. Update Profile: Keep your profile information up to date by editing your credentials 
    4. Delete Profile: If you decide to leave, easily delete your account and all associated data 