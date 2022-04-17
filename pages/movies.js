import { useState, useEffect } from "react";

import Head from "next/head";

import Layout from "../components/Layout";

import { connectToDatabase } from "../util/mongodb";

export default function Movies({ movies }) {
  const [title, setTitle] = useState("");
  const [metacritic, setMetacritic] = useState(0);
  const [plot, setPlot] = useState("");
  const [movieList, setMovieList] = useState(movies);
  const [isLoading, setIsLoading] = useState(false);

  const deleteMovie = async (_id) => {
    setIsLoading(true);
    try {
      const deleteRes = await fetch(`/api/movies/delete/${_id}`, {
        method: "DELETE",
      });
      const deleteMovie = await deleteRes.json();

      if (deleteMovie.acknowledged && deleteMovie.deletedCount === 1) {
        setMovieList(movieList.filter((movie) => movie._id !== _id));
      }
    } catch (error) {}
    setIsLoading(false);
  };

  const handleMovieSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const postRes = await fetch("/api/movies/insert/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          metacritic: parseInt(metacritic),
          plot,
        }),
      });

      const postResJson = await postRes.json();

      setMovieList([...movieList, postResJson.movie]);
      setMetacritic(0);
      setPlot("");
      setTitle("");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>Movies</title>
      </Head>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      {/* USER MOVIE INPUT FORM */}
      <form onSubmit={async (e) => {}}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="metacritic">Metacritic</label>
          <input
            type="number"
            className="form-control"
            id="metacritic"
            value={metacritic}
            onChange={(e) => setMetacritic(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="plot">Plot</label>
          <textarea
            className="form-control"
            id="plot"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />
        </div>
        <button
          onClick={handleMovieSubmit}
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>metacritic</th>
            <th>plot</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.metacritic}</td>
              <td>{movie.plot}</td>
              <td>
                <button
                  onClick={() => deleteMovie(movie._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td,
        th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: #eee;
        }
      `}</style>
    </Layout>
  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}
