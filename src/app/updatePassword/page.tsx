"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function updatePassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const sendNewPassword = async () => {
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords Do Not Match");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetPassword", {
        newPassword,
        token,
      });
      toast.success(response.data.message);
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      {loading && <h3>loading... </h3>}
      <label htmlFor="password">New Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="enter password"
        className="text-black w-[300px] p-3 rounded-full font-poppins"
      />
      <br />
      <label htmlFor="password">Confirm Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="enter password"
        className="text-black w-[300px] p-3 rounded-full font-poppins"
      />
      <br />
      <div className="mt-4">
        <button
          className="bg-white text-black rounded-full py-3 px-3"
          onClick={sendNewPassword}
          disabled={loading}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
