import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handlePatientSignup } from "../../Services/patientService";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    age: "",
    address: "",
    contactNumber: "",
    email: "",
    password: "",
    closestPerson: {
      firstName: "",
      lastName: "",
      address: "",
      contactNumber: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("closestPerson")) {
      const fieldName = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        closestPerson: {
          ...prevData.closestPerson,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handlePatientSignup(formData);
      console.log("Signup response:", response.status);

      if (response.status === 201) {
        console.log("Response is 201, navigating...");
        const result = response.data;
        console.log("Signup successful:", result);
        navigate("/login");
      } else {
        const errorData = await response.data;
        console.error("Signup failed:", errorData);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container max-w-lg p-8 mx-auto mt-10 bg-white rounded-lg shadow-lg">
  <h2 className="mb-4 text-2xl font-bold text-center text-blue-600">Patient Signup</h2>
  <form onSubmit={handleSubmit}>
    <h3 className="mb-2 text-xl font-bold text-gray-800">Your Details</h3>
    
    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Firstname</label>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>
    
    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Lastname</label>
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">DOB</label>
      <input
        type="date"
        name="dateOfBirth"
        placeholder="Date of Birth"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Gender</label>
      <div className="flex items-center gap-4">
        <div>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            required
            className="mr-1"
          />
          <label className="text-gray-600">Male</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            required
            className="mr-1"
          />
          <label className="text-gray-600">Female</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            value="Other"
            onChange={handleChange}
            required
            className="mr-1"
          />
          <label className="text-gray-600">Other</label>
        </div>
      </div>
    </div>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Age</label>
      <input
        type="number"
        name="age"
        placeholder="Age"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Address</label>
      <input
        type="text"
        name="address"
        placeholder="Address"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Contact Number</label>
      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <h3 className="mb-2 text-xl font-bold text-gray-800">Closest Person&apos;s Details</h3>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Firstname</label>
      <input
        type="text"
        name="closestPerson.firstName"
        placeholder="First Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Lastname</label>
      <input
        type="text"
        name="closestPerson.lastName"
        placeholder="Last Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Address</label>
      <input
        type="text"
        name="closestPerson.address"
        placeholder="Address"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-4">
    <label className="block mb-2 text-lg font-semibold text-gray-700">Contact Number</label>
      <input
        type="text"
        name="closestPerson.contactNumber"
        placeholder="Contact Number"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={handleChange}
        required
      />
    </div>

    <button
      type="submit"
      className="w-full px-4 py-2 font-bold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
    >
      Signup
    </button>
  </form>
</div>

  );
};

export default Signup;
