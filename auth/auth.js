const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = 'd5f0dfc7595c92c8284f023d264780e97731e00f9feb0c9b59eb9a8adf8d8d0619586d'

//REGISTRATION FUNCTION
exports.register = async (req, res, next) => {
    const { username, password } = req.body
    if(password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters"})
    }try{
     await bcryptjs.hash(password, 10).then(async (hash) => {
        await User.create({
            username, 
            password: hash,
        }).then(user => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
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
                message: "User successfully created",
                user,
            })
          })
    .catch((error) =>
        res.status(400).json({
            message: "User not successfuly created",
            error: error.message,
        })
      );
     });
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      });
    };
  };

//LOGIN FUNCTION  
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    }
    
    bcryptjs.compare(password, user.password).then(function (result) {
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
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
};


//UPDATE FUNCTION 
exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  if (role && id) {
    try {
      const user = await User.findById(id);
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
};


//DELETE FUNCTION  
exports.deleteUser = async(req, res, next) => {
  const { id } = req.body
  await User.findById(id)
    .then(user => user.deleteOne())
    .then(user => 
        res.status(201).json({message: "User successfully deleted", user})
        )
        .catch(error => 
          res.status(400).json({ message: "An error occurred", error: error.message }))
}
