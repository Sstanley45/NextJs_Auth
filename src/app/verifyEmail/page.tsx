"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function verifyEmail() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  //grab the token from the url so that we update the token state.
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const sendToken = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyEmail", { token });
      //  console.log(response.data);
      setError(false);
      setLoading(false);
      setIsVerified(true);
      toast.success("Account verified successfully!")
    } catch (error: any) {
      setError(true);
      console.log("error while verifying email", error);
      setLoading(false);
      toast.error("Something went wrong")
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      sendToken();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-screen py-2">
        <h2>loading...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-screen py-2">
        <h2>Error...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-screen py-2">
        <h1>Verifying Email...</h1>
        <h2>
          {token ? `verification token: ${token}` : "No verification token"}
        </h2>
        <br />
        <br />
        {isVerified && (
          <div className="bg-green">
            <h2>Email Verified Successfully!</h2>
            <Link href="/login">Login</Link>
          </div>
        )}
      </div>
    </>
  );
}
