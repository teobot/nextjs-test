import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  metacritic: Number,
  plot: String,
});

export const Movie = mongoose.model("Movie", movieSchema);
