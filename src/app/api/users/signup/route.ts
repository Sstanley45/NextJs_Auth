import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

//connect to the database
connectDB();

//handle the request
export async function POST(request: NextRequest) {
  try {
    //grab data from front-end from request.json
    const reqBody = await request.json();
    console.log(reqBody);
    const { name, email, password } = reqBody;

    //check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User with this email already exists!" },
        { status: 400 }
      );
    }

    //hashPassword
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //save user to database
    const newUser = new User({ name, email, password: hashedPassword });
    const createdUSer = await newUser.save();

    //send verification Email..
    await sendMail({ email, emailType: "VERIFY", userId: createdUSer._id });
    //send response
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      createdUSer,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
