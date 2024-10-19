import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { patientResetPassword } from "../../Services/patientService";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { hash } = useParams();

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== repeatPassword) {
      setError("Passwords don't match");
      setMessage("");
      return;
    }

    try {
      const response = await patientResetPassword(newPassword);
      setMessage(response.data.message);
      if (response.status === 200) {
        navigate("/login");
      }
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Password reset failed");
      setMessage("");
    }
  };

  if (hash === localStorage.getItem("random")) {
    return (
      <div className="container max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-blue-600">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword}>
          {error && <p className="mb-4 text-red-600">{error}</p>}
          {message && <p className="mb-4 text-green-600">{message}</p>}

          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">
              New Password:
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">
              Repeat New Password:
            </label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
      </div>
    );
  }
};

export default ResetPassword;
