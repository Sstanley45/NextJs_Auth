"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SendForgotPasswordEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/sendPasswordToken", { email });
      setSuccess(true); 
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.log(error);
    } finally {
      setLoading(false)
    }
  };


  if (loading) {
    <div>
      <h2>Loading...</h2>
    </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      {success ? (
        <div>
          <h1>Please Check Email to Reset Password!</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-2 min-h-screen">
          <h1>RESET PASSWORD</h1>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="text-black w-[300px] p-3 rounded-full font-poppins"
          />
          <br />
          <br />
          <button
            className="bg-white text-black rounded-full py-3 px-3"
            onClick={sendEmail}
            disabled={loading}
          >
            submit
          </button>
        </div>
      )}
    </div>
  );
}
