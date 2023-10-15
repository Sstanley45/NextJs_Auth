import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    //generate a token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    //find that user in database and update the verifyToken with the above token
    //and also set the token expiry time.

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ernestina.abbott53@ethereal.email",
        pass: "AaZM2BbjbZ8EtRQRww",
      },
    });

    const info = await transporter.sendMail({
      from: "stanley@gmail.dev",
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "VERIFY EMAIL ✔" : "RESET YOUR PASSWORD", // Subject line

      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your email"
      } </p>`,
    });
  } catch (error: any) {
    throw new Error(error.messages);
  }
};
