import { dbConnect } from "@/libs/db";
import Users from "@/model/user-registration";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req, res) {
  console.log("HIT REQUEEST")
  const data = await req.json();
  console.log(data);
  // console.log(registrationSchema.safeParse(data));
  // return NextResponse.json({data})
  try {
    // connect to database
    await dbConnect();
    // validate the user information using zod
    // if (registrationSchema.safeParse(data).success) {
    // If true, then destructure the data variable
    let { firstname, lastname, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt
    // console.log(data);

    // Create new entry from the data and save to the database
    const user = new Users({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    // console.log(user);
    try {
      const saveInfo = await user.save();

      if (!saveInfo) {
        return NextResponse.json({ error }, { status: 412, message: error });
      }

      return NextResponse.json({ result: "successful", userId: saveInfo });
    } catch (error) {
      console.error(error.message);
      return NextResponse.json({ error }, { status: 401, message: error });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "database not connecting" },
      { status: 500 }
    );
  }
}
