import mongoose from "mongoose";

import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  try {
    // create new movie
    const { db } = await connectToDatabase();

    const ins = await db.collection("movies").insertOne({
      title: req.body.title,
      metacritic: parseInt(req.body.metacritic),
      plot: req.body.plot,
    });

    const movie = await db.collection("movies").findOne({
      _id: ins.insertedId,
    });

    // send response
    return res.status(200).send({
      message: "Movie added successfully",
      movie,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error adding movie",
      error: error.message,
    });
  }
}
