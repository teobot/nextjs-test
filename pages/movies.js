import { useState } from "react";

import Head from "next/head";

import Layout from "../components/Layout";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { DeleteForever } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import { connectToDatabase } from "../util/mongodb";

export default function Movies({ movies }) {
  const [title, setTitle] = useState("");
  const [metacritic, setMetacritic] = useState(5);
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
      setMetacritic(5);
      setPlot("");
      setTitle("");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Head>
            <title>Movies</title>
          </Head>
          <Typography variant="h3">My Logged Movies</Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper
            elevation={2}
            style={{ width: "100%", padding: 25, margin: "0px 0px 10px 0px" }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  fullWidth
                  id="filled-basic"
                  label="Movie Title"
                  variant="filled"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <div>
                  <Typography component="legend">Movie Rating</Typography>
                  <Rating
                    onChange={(event, newValue) => {
                      setMetacritic(newValue);
                    }}
                    name="customized-10"
                    value={metacritic}
                    min={0}
                    max={10}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  id="outlined-multiline-static"
                  label="Movie Plot"
                  multiline
                  rows={4}
                  value={plot}
                  onChange={(e) => setPlot(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMovieSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Add Movie"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Metacritic Rating</TableCell>
                  <TableCell>Plot</TableCell>
                  <TableCell align="right">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movieList.map((movie) => (
                  <TableRow
                    key={movie._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {movie.title}
                    </TableCell>
                    <TableCell>{movie.metacritic}</TableCell>
                    <TableCell>{movie.plot}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => deleteMovie(movie._id)}>
                        <DeleteForever />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
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
