import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const patientLogin = async (body) => {
  try {
    const backendURL = `${baseUrl}/api/patients/login`; // Adjust based on your API URL
    const response = await axios.post(backendURL, body);
    localStorage.setItem("token", response.data.token);
    return response;
  } catch (err) {
    console.error("Error during login:", err);
    return err;
  }
};

export const handlePatientSignup = async (formData) => {
  try {
    const backendURL = `${baseUrl}/api/patients/signup`;

    const response = await axios.post(backendURL, formData);
    console.log("Signup successful:", response);

    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    return error;
  }
};

export const patientForgotPassword = async (body) => {
  localStorage.setItem("email", body.email);
  try {
    const response = await axios.post(
      `${baseUrl}/api/patients/forgot-password`,
      body
    );
    localStorage.setItem("hash", response.data.hash);
    return response;
  } catch (error) {
    return error;
  }
};

export const patientVerifyOtp = async (otp) => {
  const hash = localStorage.getItem("hash");
  const body = { otp, hash };
  try {
    const response = await axios.post(
      `${baseUrl}/api/patients/verify-otp`,
      body
    );

    localStorage.removeItem("hash");
    return response;
  } catch (error) {
    return error;
  }
};

export const patientResetPassword = async (newPassword) => {
  const email = localStorage.getItem("email");
  try {
    const response = await axios.post(
      `${baseUrl}/api/patients/reset-password`,
      {
        newPassword,
        email,
      }
    );
    localStorage.removeItem("email");
    localStorage.removeItem("random");
    return response;
  } catch (error) {
    return error;
  }
};
