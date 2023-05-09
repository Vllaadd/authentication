const User = require("../models/User");

//registration function 
exports.register = async (req, res, next) => {
    const { username, password } = req.body
    if(password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters"})
    }try{
        await User.create({
            username, 
            password,
        }).then(user =>
            res.status(200).json({
                message: "User successfully created",
                user,
            })
            
            )
    }catch(error){
        res.status(401).json({
            message: "User not successfuly created",
            error: error.message,
        })
     }
    }

// login function 
    exports.login = async (req, res, next) => {
        const { username, password } = req.body
        if(!username || !password) {
            return res.status(400).json({
                message: "Username or Password not present",
            })
        }
        try{
            const user = await User.findOne({ username, password })
            if(!user) {
                res.status(401).json({
                    message: "login not successful",
                    error: "User not found",
                })
            }else{
                res.status(200).json({
                    message: "Login successful",
                    user,
                })
            }
        }catch(error){
            res.status(400).json({
                message: "An error occurred",
                error: error.message,
            })
        }
    }

// update function
    exports.update = async(req, res, next) => {
        const { role, id } = req.body
//verifying if role and id is present
    if(role && id) {
// verifying if the value of role is admin 
    if(role === "admin"){
        await User.findById(id)
        .then((user) => {
            if(user.role !== "admin"){
                user.role = role;
                user.save((err) => {
                    if(err){
                        return res
                            .status("400")
                            .json({message: "An error occurred", error: err.message });
                            process.exit(1);
                    }
                    res.status("201").json({message: "Update successful", user });
                });
            }else{
                res.status(400).json({message: "User is already Admin"});
            }
        })
        .catch((error) => {
            res
            .status(400)
            .json({message: "An error occurred", error: error.message});
        });
    }else{
        res.status(400).json({
            messsage: "Role is not admin",
        })
    }
}else{
    res.status(400).json({message: "Role or Id not present."})
        }
    };  
