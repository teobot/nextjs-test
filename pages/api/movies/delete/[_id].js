import mongoose from "mongoose";

import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req, res) {
  try {
    // create new movie
    const { db } = await connectToDatabase();

    const deleteMovie = await db.collection("movies").deleteOne({
      _id: mongoose.Types.ObjectId(req.query._id),
    });

    // send response
    return res.status(200).send({
      message: "Movie deleted successfully",
      acknowledged: deleteMovie.acknowledged,
      deletedCount: deleteMovie.deletedCount,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error deleting movie",
      error: error.message,
    });
  }
}
