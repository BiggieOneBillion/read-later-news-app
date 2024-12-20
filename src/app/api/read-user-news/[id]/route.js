import { dbConnect } from "@/libs/db";
import SavedNews from "@/model/saved-news-model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = await params.id;
  try {
    await dbConnect();

    const savedNews = await SavedNews.findById(id).exec();

    if (!savedNews) {
      return NextResponse.json(
        { message: "news does not exist" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Successful fetched news",
        data: savedNews,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error Fetching Data", error },
      { status: 500 }
    );
  }
}
