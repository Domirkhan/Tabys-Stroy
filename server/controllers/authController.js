import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import sendEmail from '../utils/sendEmail.js';
import ResetToken from '../models/resetTokenModel.js';
import rateLimit from 'express-rate-limit';

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,  } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Неверный email или пароль",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email не зарегистрирован",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Неверный пароль",
      });
    }

    // Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Отправляем ВСЕ данные пользователя, включая адрес
    res.status(200).send({
      success: true,
      message: "Успешный вход",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address, // Убедитесь, что address включен
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Ошибка при входе",
      error,
    });
  }
};

export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  max: 3 // максимум 3 попытки в час
});
//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "Пользователь с таким email не найден" 
      });
    }

    // Создаем и сохраняем токен
    const resetToken = JWT.sign(
      { _id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '15m' }
    );

    await ResetToken.create({
      userId: user._id,
      token: resetToken
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const emailSent = await sendEmail(
      email,
      "Сброс пароля",
      `
        <h1>Сброс пароля</h1>
        <p>Для сброса пароля перейдите по ссылке:</p>
        <a href="${resetLink}">Сбросить пароль</a>
        <p>Ссылка действительна 15 минут</p>
      `
    );

    // Логируем попытку сброса
    console.log(`Password reset requested for ${email} at ${new Date()}`);

    if (emailSent) {
      res.status(200).json({
        success: true,
        message: "Инструкции по сбросу пароля отправлены на email"
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Ошибка при отправке email"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера",
      error
    });
  }
};
export const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Проверяем токен
    const resetToken = await ResetToken.findOne({ token });
    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: "Недействительный или истекший токен сброса пароля"
      });
    }

    // Проверяем JWT
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден"
      });
    }

    // Обновляем пароль
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    // Удаляем использованный токен
    await ResetToken.deleteOne({ token });

    res.json({
      success: true,
      message: "Пароль успешно изменен"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Ошибка при сбросе пароля",
      error
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден"
      });
    }

    // Проверяем email на уникальность, если он был изменен
    if (email && email !== user.email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Этот email уже используется другим пользователем"
        });
      }
    }

    // Создаем объект с обновлениями
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (address) updates.address = address;

    // Проверяем пароль если он был предоставлен
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Пароль должен быть не менее 6 символов"
        });
      }
      updates.password = await hashPassword(password);
    }

    // Обновляем пользователя
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      updates,
      { 
        new: true, // Возвращает обновленный документ
        runValidators: true // Запускает валидаторы схемы
      }
    ).select("-password"); // Исключаем пароль из ответа

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Ошибка при обновлении профиля"
      });
    }

    res.status(200).json({
      success: true,
      message: "Профиль успешно обновлен",
      updatedUser
    });

  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
    res.status(500).json({
      success: false,
      message: error.code === 11000 
        ? "Этот email уже используется" 
        : "Ошибка при обновлении профиля",
      error: error.message
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Ошибка при получении пользователей", error);
    res.status(500).json({ success: false, message: "Ошибка на сервере" });
  }
};