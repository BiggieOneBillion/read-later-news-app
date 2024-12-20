import { NextResponse } from "next/server";
import SavedNews from "@/model/saved-news-model";
import Users from "@/model/user-registration";
import { dbConnect } from "@/libs/db";

// ! SAVE NEWS UNDER A PARTICULAR USER
export async function POST(req, res) {
  const data = await req.json();
  // console.log(registrationSchema.safeParse(data));
  // return NextResponse.json({data})

  try {
    const conn = await dbConnect();
    // check if the user exist in the db first
    try {
      const userExist = await Users.findById(data.userId);
      if (!userExist) {
        return NextResponse.json(
          { message: "user does not exit" },
          { status: 403 }
        );
      }
    } catch (error) {
      // Send an error response if there's an issue
      return NextResponse.json({ message: error.message }, { status: 405 });
    }

    const response = await SavedNews.findOne({ author: data.author });
    if (response) {
      return NextResponse.json(
        { message: "News has been save already!!" },
        { status: 420 }
      );
    } else {
      const savedNews = new SavedNews({
        author: data.author,
        content: data.content,
        description: data.description,
        publishedAt: data.publishedAt,
        title: data.title,
        urlToImage: data.urlToImage,
        url: data.url,
        user: data.userId,
      });

      const newNews = await savedNews.save();
      //Send a response indicating success
      return NextResponse.json({ result: newNews }, { status: 201 });
    }
  } catch (error) {
    // Send an error response if there's an issue
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
