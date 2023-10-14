import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



connectDB()

export async function GET(request: NextRequest) {
    try {
        const userId:any = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password")

        return NextResponse.json({message: "user found" , user}, {status:200})
    } catch (error:any) {  
        return NextResponse.json({
            error:error.message
        }, {status:400})
    }
}


