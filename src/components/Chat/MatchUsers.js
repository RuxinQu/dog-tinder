import React, { useState, useEffect } from "react";

export function MatchUsers({ u, setShowbox, setYourId, myId }) {
  const [match, setMatch] = useState(false);

  const [myMatches, setMyMatches] = useState([]);

  const [allMatch, setAllmatch] = useState([]);
  useEffect(() => {
    const getMatch = async () => {
      const myMatches = await fetch(`/user/match/${myId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const myMatchesJson = await myMatches.json();
      if (myMatchesJson.length) {
        setMyMatches([...myMatchesJson]);
      }

      const yourMatches = await fetch(`/user/match/${u._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const yourMatchesJson = await yourMatches.json();
      const bothMatch = myMatchesJson.concat(yourMatchesJson);
      if (bothMatch.length) {
        setAllmatch([...bothMatch]);
      }

      if (myMatchesJson?.includes(u._id) && yourMatchesJson?.includes(myId)) {
        setMatch(true);
      }
    };
    getMatch();
  }, [allMatch]);

  const addMatch = async (id) => {
    const result = await fetch(`/user/add-match?myId=${myId}&yourId=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <button
      onClick={() => {
        if (match) {
          setShowbox(true);
          setYourId(u._id);
        } else {
          addMatch(u._id);
        }
      }}
    >
      {match ? u.email : myMatches?.includes(u._id) ? "request sent" : "Add"}
      {/* {myMatches?.includes(u._id) ? u.email : "Add"} */}
    </button>
  );
}
