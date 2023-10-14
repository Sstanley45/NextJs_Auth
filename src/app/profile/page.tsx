"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from 'next/link'

export default function ProfilePage() {
  const [userName, setUserName] = useState(null)
   const [userId, setUserId] = useState(null);
  const router = useRouter();
  const logOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error) {
      console.log("LogOut failed!", error);
      toast.error("error when logging out!");
    }
  };

  const getUserID = async () => {
    try {
      const response = await axios.get('/api/users/userDetails');
      const data = response.data;
      setUserName(data.user.name);
      setUserId(data.user._id)
     console.log(data.user);
      
    } catch (error) {
      console.log('error fetching user Details - ', error);
      
    }
  } 
    
  useEffect(() => {
    getUserID()
  }, []);



  return (
    <>
      <h1>ProfilePage</h1>
      <h3>User Id </h3>
      <p>userName is {userName ? userName : "loading..."}</p>
      <div>
        <Link href={`/profile/${userId}`}>Click to view user Id</Link>
      </div>
      <button
        className="p-3 bg-white text-black m-3 rounded cursor-pointer font-poppins"
        onClick={logOut}
      >
        Logout
      </button>
    </>
  );
}
