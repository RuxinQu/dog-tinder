import React, { useState, useEffect } from "react";

export function MatchUsers({ u, setShowbox, setYourId, myId }) {
  const [match, setMatch] = useState(false);

  const [myMatches, setMyMatches] = useState([]);

  const [allMatch, setAllmatch] = useState([]);
  useEffect(() => {
    const getMatch = async () => {
      const myProfile = await fetch(`/user/one/${myId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const myProfileJson = await myProfile.json();
      const myMatches = myProfileJson.matches;
      if (myMatches.length) {
        setMyMatches([...myMatches]);
      }

      const yourProfile = await fetch(`/user/one/${u._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const yourProfileJson = await yourProfile.json();
      const yourMatches = yourProfileJson.matches;
      const bothMatch = myMatches.concat(yourMatches);
      if (bothMatch.length) {
        setAllmatch([...bothMatch]);
      }

      if (myMatches?.includes(u._id) && yourMatches?.includes(myId)) {
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
