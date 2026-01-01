import { dbConnect } from "@/libs/db";
import SavedNews from "@/model/saved-news-model";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();
  try {
    await dbConnect();

    try {
      const deletedDocument = await SavedNews.findByIdAndDelete(data.id);

      if (!deletedDocument) {
        return NextResponse.json(
          { message: "Document not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Document deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
