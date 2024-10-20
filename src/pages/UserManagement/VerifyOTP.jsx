/**
 * VerifyOTP component handles the OTP verification process for user authentication.
 * 
 * This component:
 * - Manages OTP input state and handles form submission for OTP verification.
 * - Displays success or error messages based on the OTP verification response.
 * - Provides functionality to resend OTP if the user did not receive it.
 * - Navigates to the reset password page upon successful OTP verification.
 * 
 * @component
 * @example
 * return (
 *   <VerifyOTP />
 * )
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { patientVerifyOtp } from "../../Services/patientService";


const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await patientVerifyOtp(otp);
      setMessage(response.data.message);
      if (response.status === 200) {
        localStorage.setItem("random", response.data.randomDigit);
        navigate(`/reset-password/${response.data.randomDigit}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || "OTP verification failed");
      setMessage("");
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await axios.post("/api/forgot-password", { email });
      setResendMessage("OTP has been resent to your email.");
      setError("");
    } catch (error) {
      setError("Failed to resend OTP.");
      setResendMessage("");
    }
  };

  return (
    <div className="container max-w-sm p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
  <h2 className="mb-4 text-2xl font-bold text-center text-blue-600">Verify OTP</h2>
  <form onSubmit={handleVerifyOtp}>
    {error && <p className="mb-4 text-red-600">{error}</p>}
    {message && <p className="mb-4 text-green-600">{message}</p>}

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">OTP</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <button
      type="submit"
      className="w-full px-4 py-2 font-bold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
    >
      Verify OTP
    </button>
  </form>

  <div className="mt-6 text-center">
    {resendMessage && <p className="mb-4 text-green-600">{resendMessage}</p>}
    <p className="text-gray-700">
      Didn&apos;t receive the OTP?{" "}
      {/* <button
        onClick={handleResendOtp}
        className="font-bold text-blue-600 hover:underline"
      >
        Resend OTP
      </button> */}
      <a onClick={handleResendOtp} className="font-bold text-blue-600 cursor-pointer">Resend OTP</a>
    </p>
  </div>
</div>

  );
};

export default VerifyOTP;
