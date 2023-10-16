import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();
    //console.log("token", token);
    //console.log("password", newPassword);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    //hash ou new password
    const salt = await bcryptjs.genSalt(10);
    const newHashedPassword = await bcryptjs.hash(newPassword, salt);
    

    user.password = newHashedPassword; 
    user.forgotPasswordTokenExpiry = null;
    await user.save();

    return NextResponse.json({
      message: "Password Updated Succesfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error when updating password!",
      },
      {
        status: 500,
      }
    );
  }
}
