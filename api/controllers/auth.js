import {db} from '../connect.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    const { username, email, password, name } = req.body;
  
    // Basic validation
    if (!username || !email || !password || !name) {
      return res.status(400).json("All fields are required");
    }
  
    // Check if user exists
    const queryCheckUser = "SELECT * FROM users WHERE username = ?";
    db.query(queryCheckUser, [username], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
  
      if (result.length > 0) {
        return res.status(409).json("User already exists");
      }
  
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Create a new user
      const queryInsertUser = "INSERT INTO users(`username`, `email`, `password`, `name`) VALUES(?)";
      const values = [username, email, hashedPassword, name];
  
      db.query(queryInsertUser, [values], (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("User created");
      });
    });
  };
  

export const login =  (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json("User not found");
        }

        const checkPassword = bcrypt.compareSync(req.body.password, result[0].password)

        if (!checkPassword) {
            return res.status(401).json("Password is incorrect");
        }

        const {password,...others}=result[0];

        const token=jwt.sign({id:result[0].id},"secretkey");
        
        res.cookie("accessToken",token,{httpOnly:true}).status(200).json(others);
    });

}

export const logout =  (req, res) => {
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none",
    }).status(200).json("User has been logged out");
}