import { create, find, findOne, findById } from "../models/User";
import { hash as _hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
const jwtSecret = 'd5f0dfc7595c92c8284f023d264780e97731e00f9feb0c9b59eb9a8adf8d8d0619586d';

//REGISTRATION FUNCTION
export async function register(req, res, next) {
    const { username, password } = req.body
    if(password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters"})
    }
     _hash(password, 10).then(async (hash) => {
        await create({
            username, 
            password: hash,
        }).then((user) => {
          const maxAge = 3 * 60 * 60;
          const token = sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
            res.status(201).json({
                message: "User successfully created",
                user: user._id,
                role: user.role,
            })
          })
    .catch((error) =>
        res.status(400).json({
            message: "User not successfuly created",
            error: error.message,
        })
      );
     });
    } 

  export async function   getUsers(req, res, next) {
    await find({})
    .then(users => {
      const userFunction = users.map(user => {
        const container = {}
        container.username = user.username
        container.role = user.role
        return container
      })
      res.status(200).json({user: userFunction})
    })
    .catch(err =>
      res.status(401).json({message: "Not successful", error: err.message})
      )
  }

//LOGIN FUNCTION  
export async function login(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }try{
    const user = await findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    }
    
    compare(password, user.password).then(function (result) {
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = sign(
          { id: user._id, username, role: user.role },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(200).json({
          message: "Login successful",
          user,
        });
      } else {
        res.status(400).json({ message: "Login not successful" });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
}


//UPDATE FUNCTION 
export async function update(req, res, next) {
  const { role, id } = req.body;
  if (role && id) {
    try {
      const user = await findById(id);
      if (user.role === "admin") {
        res.status(400).json({ message: "User is already an Admin" });
      } else {
        user.role = role;
        await user.save();
        res.status(201).json({ message: "Update successful", user });
      }
    } catch (error) {
      res.status(400).json({ message: "An error occurred", error: error.message });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
}


//DELETE FUNCTION  
export async function deleteUser(req, res, next) {
  const { id } = req.body
  await findById(id)
    .then(user => user.deleteOne())
    .then(user => 
        res.status(201).json({message: "User successfully deleted", user})
        )
        .catch(error => 
          res.status(400).json({ message: "An error occurred", error: error.message }))
}
