import Head from "next/head";

import { connectToDatabase } from "../util/mongodb";

import Layout from "../components/Layout";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import Link from "next/link";

export default function Home({ isConnected }) {
  return (
    <Layout>
      <Head>
        <title>My Nextjs Test</title>
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js with MongoDB!</a>
        </h1>

        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
            for instructions.
          </h2>
        )}
      </main>
      <Link href={"/movies"}>
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Movie Test
              </Typography>
              <Typography variant="body2" color="text.secondary">
                just a little area for testing getting movie data from a mongo
                database and displaying it, there are also some delete and add
                tools in there.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const conn = await connectToDatabase();

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
