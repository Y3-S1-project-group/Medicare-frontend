import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patientForgotPassword } from "../../Services/patientService";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const body = { email };

    try {
      const response = await patientForgotPassword(body);
      setMessage(response.data.message);
      navigate("/verifyotp");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
  <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
    <h2 className="mb-6 text-2xl font-semibold text-center text-blue-600">Forgot Password</h2>
    <form onSubmit={handleForgotPassword}>
      {error && <p className="mb-4 text-center text-red-500">{error}</p>}
      {message && <p className="mb-4 text-center text-green-500">{message}</p>}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Send Reset Link
      </button>
    </form>
  </div>
</div>

  );
};

export default ForgotPassword;
