import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      console.log(document.cookie);

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);

        navigate("/home");
      } else {
        console.error("Login failed:", data.message);
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col font-sans"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      {/* Logo */}
      <div className="p-4 flex items-center">
        <img src="/logo1.png" alt="Riscol Logo" className="w-[50px] h-[50px]" />
        <h1 className="text-xl font-extrabold text-amber-500 ml-1">Riscol</h1>
      </div>

      {/* Form Container */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-[#313338] rounded-[8px] max-w-sm w-full px-6 py-8 shadow-lg text-white">
          <h2 className="text-[20px] font-bold text-center">Welcome back!</h2>
          <p className="text-center text-sm text-[#b5bac1] mt-1">
            We're so excited to see you again!
          </p>

          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-[12px] font-semibold uppercase mb-1 block text-[#b5bac1]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                className="w-full bg-[#1e1f22] border-none rounded-md px-3 py-[10px] text-white text-sm focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[12px] font-semibold uppercase mb-1 block text-[#b5bac1]">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
                className="w-full bg-[#1e1f22] border-none rounded-md px-3 py-[10px] text-white text-sm focus:outline-none"
                required
              />
            </div>

            {/* Log In Button */}
            <button
              type="submit"
              className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white py-2 rounded-md font-semibold mt-2 text-[15px]"
            >
              Log In
            </button>

            {/* Register link */}
            <p className="text-sm text-[#b5bac1] mt-3 text-center">
              Need an account?{" "}
              <button
                type="button"
                className="text-sm text-[#00a8fc] ml-1 hover:underline"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
