import Link from "next/link";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="container">
      <div className="navigation">
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
      </div>
      <div className="container-body">{children}</div>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        .navigation {
          position: relative;
          width: 100%;
          background-color: whitesmoke;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          padding: 10px;
        }
        .container-body {
          height: 100%;
          width: 100%;
          padding: 10px;
        }
        .container {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
