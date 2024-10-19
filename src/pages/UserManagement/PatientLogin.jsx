import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { patientLogin } from "../../Services/patientService";

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { email, password };

    try {
      const response = await patientLogin(body);

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        navigate("/Home");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid credentials");
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
  <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-2xl">
    <h2 className="mb-6 text-2xl font-semibold text-center text-blue-600">Welcome!</h2>
    <form onSubmit={handleLogin}>
      {error && <p className="mb-4 text-center text-red-500">{error}</p>}
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
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </form>
    <div className="mt-4 text-center">
      <Link
        to="/forgot-password"
        className="text-sm text-blue-500 hover:underline"
      >
        Forgot Password?
      </Link>
    </div>
    <div className="mt-2 text-center">
      <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
      <Link to="/signup" className="text-sm text-blue-500 hover:underline">
        Sign up here
      </Link>
    </div>
  </div>
</div>
    </>
  );
};

export default PatientLogin;
