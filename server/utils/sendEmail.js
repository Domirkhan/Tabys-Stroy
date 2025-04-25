import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, html) => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true для 465 порта, false для остальных
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS // Используйте пароль приложения
        },
        tls: {
          rejectUnauthorized: false // Только для разработки
        }
      });
  
      const mailOptions = {
        from: `"Tabys Stroy" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        html: html
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.messageId);
      return true;
    } catch (error) {
      console.error('Email error:', error);
      return false;
    }
  };

export default sendEmail;