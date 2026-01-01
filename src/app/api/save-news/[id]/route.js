import { dbConnect } from "@/libs/db";
import SavedNews from "@/model/saved-news-model";
import Users from "@/model/user-registration";
import { NextResponse } from "next/server";

//! GET ALL NEWS FOR A PARTICULAR USER
export async function GET(req, { params }) {
  const id = params.id;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 12;
  const searchQuery = searchParams.get("q") || "";
  const skip = (page - 1) * limit;

  try {
    await dbConnect();
    
    // check if user exists
    const userExist = await Users.findById(id);
    if (!userExist) {
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 400 }
      );
    }

    // Build query
    const query = { user: id };
    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    // try to find saved news with pagination and search
    try {
      const totalResults = await SavedNews.countDocuments(query);
      const savedNews = await SavedNews.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();

      if (!savedNews || (savedNews.length === 0 && page === 1)) {
        return NextResponse.json({ message: "No result", articles: [], totalResults: 0 }, { status: 200 });
      }

      return NextResponse.json({
        articles: savedNews,
        totalResults,
        page,
        totalPages: Math.ceil(totalResults / limit)
      }, { status: 200 });
    } catch (error) {
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
