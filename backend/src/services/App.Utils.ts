
import nodemailer from "nodemailer";





export const sendInvitationEmail = async (toEmail: string, token: string) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT!),
        secure: false,
        auth: {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASS!,
        },
        logger: true,
        debug: true,
    });

    const inviteLink = `${process.env.FONTEND_URL}/#/invite/accept?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM!,
        to: toEmail!,
        subject: "Elibrary - Invitation",
        text: inviteLink,
    };



    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }


};
