"use client"; //to convert the component to client
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUp = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const response = await axios.post("/api/users/signup", user);
      const data = response.data;
      console.log(data);

      router.push("/login");
    } catch (error: any) {
      console.log("sign up failed", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1>Sign Up</h1>
      {loading && <h3 className="text-white text-center">Loading...</h3>}
      <br />
      <hr />

      <label htmlFor="name">Name</label>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="name"
        className="text-black w-[300px] p-3 rounded-full font-poppins"
      />
      <label htmlFor="name">Email</label>
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="text-black w-[300px] p-3 rounded-full font-poppins"
      />
      <label htmlFor="name">Password</label>
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
          className="bg-white text-black rounded-full py-3 px-3 cursor-pointer"
          onClick={onSignUp}
    
        >
          Sign Up
        </button>
      </div>
      <div>
        <Link href="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}
