import nodemailer from 'nodemailer';

const sendAdminEmail = async (subject, html) => {
    try {
        console.log('Отправка уведомления администратору...');
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: `"Tabys Stroy - Уведомления" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Уведомление отправлено администратору:', info.messageId);
        return true;
    } catch (error) {
        console.error('Ошибка отправки уведомления администратору:', error);
        return false;
    }
};

export default sendAdminEmail;