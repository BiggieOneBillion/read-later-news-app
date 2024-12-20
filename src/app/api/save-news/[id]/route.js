import { dbConnect } from "@/libs/db";
import SavedNews from "@/model/saved-news-model";
import Users from "@/model/user-registration";
import { NextResponse } from "next/server";

//! GET ALL NEWS FOR A PARTICULAR USER
export async function GET(req, { params }) {
  const id = params.id;
  try {
    // connect to database
    const conn = await dbConnect();
    // check if user exist
    const userExist = await Users.findById(id);
    if (!userExist) {
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 400 }
      );
    }
    // try to find all the saved news with the user id
    try {
      const savedNews = await SavedNews.find({ user: id }).exec();
      if (!savedNews || savedNews.length == 0) {
        return NextResponse.json({ message: "No result" }, { status: 400 });
      }
      return NextResponse.json(savedNews, { status: 200 });
    } catch (error) {
      // Send an error response if there's an issue
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

// export async function GET(req, { params }) {
//   const id = params.id;
//   try {
//     // connect to database
//     const conn = await dbConnect();
//     // check if user exist
//     const userExist = await Users.findById(id);
//     if (!userExist) {
//       return NextResponse.json(
//         { message: "user does not exit" },
//         { status: 400 }
//       );
//     }
//     // try to find all the saved news with the user id
//     try {
//       const savedNews = await SavedNews.find({ id }).exec();
//       if (!savedNews || savedNews.length == 0) {
//         NextResponse.json({ message: "No result" }, { status: 400 });
//       }
//       NextResponse.json(savedNews, { status: 200 });
//     } catch (error) {
//       // Send an error response if there's an issue
//       NextResponse.json({ message: error.message }, { status: 500 });
//     }
//   } catch (error) {
//     NextResponse.json({ error: "Error" }, { status: 500 });
//   }
// }
