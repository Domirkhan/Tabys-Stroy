import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Требуется авторизация"
        });
      }
      
      const decode = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      return res.status(401).json({
        success: false,
        message: "Неверный токен авторизации"
      });
    }
  };

//admin access
export const isAdmin = async (req, res, next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in admin middleware",
            error
        });
    }
};
