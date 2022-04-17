import React from "react";

import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Navbar />
      <div className="container-body">{children}</div>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Roboto", sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .navigation {
          position: relative;
          width: 100%;
          background-color: whitesmoke;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 10px 15px;
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

        .nav-item {
          font-weight: 900;
          font-size: 1.3rem;
          color: #333;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
