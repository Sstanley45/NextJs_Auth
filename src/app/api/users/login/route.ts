import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//connect to the database
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    //console.log(reqBody);

    //check existence of the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    //compare password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid Password!" }, { status: 500 });
    }

    //check if user has verified email;
    const isUserVerified = await user.isVerified;
    if (!isUserVerified) {
      return NextResponse.json(
        { error: "Please Verify Your Account" },
        { status: 400 }
      );
    }

    //now create token
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const jwtToken = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    //to access the cookie object we have to first have the response object..
    const response = NextResponse.json(
      {
        message: "Login Successful",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", jwtToken, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
