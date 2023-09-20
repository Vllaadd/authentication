# User Authoentication

## Description 
This project focuses on user authentication and provides functionality for user registration, login, profile updates, and profile deletion. It aims to securely manage user credentials and allow users to interact with their profiles through various API endpoints. 

## Tack Stack 
    1. HTML
    2. CSS
    3. JavaScript 
    4. MERN 

## Technology breakdown
   1. `const { username, password } = req.body;`: destructuring assignment to extract username and password from the req.body. 
   2. `bcrypt.hash(password, 10)`: bcrypt library is used here to hash a password. hash is a bcrypt library method. 
   3. `    const token = jwt.sign(
          { id: user._id, username, role: user.role },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs
          }
        );`: This is how jSON Web Token (JWT) is generated. JWTs are commonly used for authentication and authorization purproses, allowing users to securely access certain parts of a web application. 
    4. `res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });`: this is how an HTTP cookie in a Node.js application is set up, as part of an authentication or session management process. 
    5. `const user = await User.findOne({ username });` : THis is a database query operation. It searches the "users" collection for a document where the `username` field matches the provided `username` variable. 
    6. `bcrypt.compare(password, user.password)` : we use this method to compare the user-provided password that we want to compare with the stored hashed password 
    7. ` await User.findById(id)` : is used to find a user document in a database using their unique ID. 

## Usage 
    1. Register: Create your account by providing a unique username and password 
    2. Log In: Sign in to your account using your regsitered username and password 
    3. Update Profile: Keep your profile information up to date by editing your credentials 
    4. Delete Profile: If you decide to leave, easily delete your account and all associated data 