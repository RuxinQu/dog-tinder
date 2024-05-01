import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyEmailToken } from "../util/Api";

export default function VerifyEmail() {
  const [searchParams, setSearchParams] = useSearchParams();

  const emailToken = searchParams.get("emailToken");

  const [verifyMessage, setVerifyMessage] = useState("");

  useEffect(() => {
    const emailVerify = async () => {
      const response = await verifyEmailToken(emailToken);
      const jsonResponse = await response.json();
      if (response.ok) {
        setVerifyMessage("Email verified succesfully.");
      } else {
        setVerifyMessage(jsonResponse.message);
      }
    };
    emailVerify();
  }, [emailToken]);
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h3>
        {verifyMessage} Return to <Link to="/">home</Link> page
      </h3>
    </div>
  );
}
