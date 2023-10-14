"use client"; //to convert the component to a client component

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success!");
      console.log("login successFul", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1>Login</h1>
      {loading && <h3>loading... </h3>}
      <br />
      <hr />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="text-black w-[300px] p-3 rounded-full font-poppins"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="enter password"
        className="text-black w-[300px] p-3 rounded-full font-poppins"
      />
      <br />
      <br />
      <div className="mt-4">
        <button
          className="bg-white text-black rounded-full py-3 px-3"
          onClick={onLogin}
          disabled={loading}
        >
          Login
        </button>
      </div>
      <div>
        <Link href="/signup">Not yet created an account? Sign Up</Link>
      </div>
    </div>
  );
}
