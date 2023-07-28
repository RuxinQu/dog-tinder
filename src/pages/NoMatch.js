import React from "react";
import Link from "@mui/material/Link";
export default function NoMatch() {
  return (
    <div className="no-match">
      <h1>404 Not Found</h1>
      <img
        src="https://media.tenor.com/gInQnsr6GoMAAAAd/doge-doge-meme.gif"
        alt="dog crying"
        style={{ width: 200 }}
      />
      <p>
        Couldn't find the page. Make sure you are{" "}
        <Link href="/">logged in.</Link>
      </p>
    </div>
  );
}
