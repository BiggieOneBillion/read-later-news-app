import { dbConnect } from "@/libs/db";
import SavedNews from "@/model/saved-news-model";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();
  try {
    // connect to database
    const conn = await dbConnect();

    try {
      const deletedDocument = await SavedNews.findByIdAndDelete(data.id);

      if (!deletedDocument) {
        // If document with the given ID does not exist
        return NextResponse.json(
          { message: "Document not found" },
          { status: 404 }
        );
      }

      // If the document was successfully deleted
      NextResponse.json(
        { message: "Document deleted successfully" },
        { status: 301 }
      );
    } catch (error) {
      // Handle errors

      //   console.error("Error deleting document:", error);

      NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  } catch (error) {
    NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
