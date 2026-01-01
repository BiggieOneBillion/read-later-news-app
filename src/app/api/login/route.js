import { dbConnect } from "@/libs/db";
import Users from "@/model/user-registration";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req, res) {
  const data = await req.json();
  try {
    // connect to database
    const conn = await dbConnect();
    try {
      // validate the user information using zod
      const response = await Users.findOne({ email: data.email });

      // Compare the provided password with the stored hashed password
      const isValidPassword = await bcrypt.compare(
        data.password,
        response.password
      );

      if (response) {
        // If it returns a value
        if (isValidPassword) {
          // If password stored in db is the same as the one the user provides then the login process is successful!!
          return NextResponse.json({
            message: "Successful!!",
            userId: response._id,
            firstname: response.firstname,
            lastname: response.lastname,
          });
        }
        return NextResponse.json(
          { message: "Password Is Incorrect" },
          { status: 400 }
        );
      }
      //  else {
      //  return NextResponse.json({ message: "user does not exit" });
      // }
      return NextResponse.json(
        { message: "user does not exit" },
        { status: 401 }
      );
    } catch (error) {
      // Send an error response if there's an issue
      NextResponse.json({ message: error.message });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
