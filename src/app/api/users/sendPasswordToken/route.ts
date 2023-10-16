import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { sendMail } from "@/helpers/mailer";

connectDB();



export async function POST(request: NextRequest) {
    try {
      const { email } = await request.json();
        const user = await User.findOne({ email });
        sendMail({ email, emailType: "RESET", userId: user._id });

      return NextResponse.json({ message: "Please Check Email To Reset Password!" }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({
            error: "Error sending reset Password Link",
            success: false
        }, { status: 400 });
    }
}