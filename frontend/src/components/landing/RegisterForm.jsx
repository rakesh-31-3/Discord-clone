import React, { useState } from "react";
import { months, years } from "../../constants/dob";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [focusedField, setFocusedField] = useState(null);

  const initialForm = {
    email: "",
    displayName: "",
    username: "",
    password: "",
    day: "",
    month: "",
    year: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { day, month, year, ...rest } = formData;

    const DateOfBirth = `${day}-${month}-${year}`;

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...rest,
          DateOfBirth,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful", data);
        setFormData(initialForm);
        setFocusedField(null);
        navigate("/login");
      } else {
        console.error("Registration failed:", data.message);
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error during registration:", err);
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
          <h2 className="text-[20px] font-bold mb-6 text-center">
            Create an account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-[12px] font-semibold uppercase mb-1 block text-[#b5bac1]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-[#1e1f22] border-none rounded-md px-3 py-[10px] text-white text-sm focus:outline-none"
                required
              />
            </div>

            {/* Display Name */}
            <div>
              <label className="text-[12px] font-semibold uppercase mb-1 block text-[#b5bac1]">
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={handleChange("displayName")}
                onFocus={() => setFocusedField("display")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-[#1e1f22] border-none rounded-md px-3 py-[10px] text-white text-sm focus:outline-none"
              />
              {focusedField === "display" && (
                <p className="text-[12px] text-[#b5bac1] mt-1">
                  This is how others see you. You can use special characters and
                  emojis.
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="text-[12px] font-semibold uppercase mb-1 block text-[#b5bac1]">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={handleChange("username")}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-[#1e1f22] border-none rounded-md px-3 py-[10px] text-white text-sm focus:outline-none"
                required
              />
              {focusedField === "username" && (
                <p className="text-[12px] text-[#b5bac1] mt-1">
                  Please only use numbers, letters, underscores _ or full stops.
                </p>
              )}
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
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-[#1e1f22] border-none rounded-md px-3 py-[10px] text-white text-sm focus:outline-none"
                required
              />
            </div>

            {/* Date of Birth */}
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#b5bac1",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Date of Birth <span style={{ color: "#ef4444" }}>*</span>
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                {/* Day */}
                <FormControl
                  fullWidth
                  sx={{ bgcolor: "#1e1f22", borderRadius: 1 }}
                >
                  <Select
                    value={formData.day}
                    onChange={handleChange("day")}
                    required
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return <span style={{ color: "#b5bac1" }}>Day</span>;
                      }
                      return selected;
                    }}
                    inputProps={{
                      sx: { color: "#b5bac1", fontSize: 18 },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 200,
                          bgcolor: "#1e1f22",
                          color: "#b5bac1",
                        },
                      },
                    }}
                  >
                    {[...Array(31)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Month */}
                <FormControl
                  fullWidth
                  sx={{ bgcolor: "#1e1f22", borderRadius: 1 }}
                >
                  <Select
                    value={formData.month}
                    onChange={handleChange("month")}
                    required
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return <span style={{ color: "#b5bac1" }}>Month</span>;
                      }
                      return selected;
                    }}
                    inputProps={{
                      sx: { color: "#b5bac1", fontSize: 18 },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 200,
                          bgcolor: "#1e1f22",
                          color: "#b5bac1",
                        },
                      },
                    }}
                  >
                    {months.map((month, i) => (
                      <MenuItem key={i} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Year */}
                <FormControl
                  fullWidth
                  sx={{ bgcolor: "#1e1f22", borderRadius: 1 }}
                >
                  <Select
                    value={formData.year}
                    onChange={handleChange("year")}
                    required
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return <span style={{ color: "#b5bac1" }}>Year</span>;
                      }
                      return selected;
                    }}
                    inputProps={{
                      sx: { color: "#b5bac1", fontSize: 18 },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 200,
                          bgcolor: "#1e1f22",
                          color: "#b5bac1",
                        },
                      },
                    }}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white py-2 rounded-md font-semibold mt-2 text-[15px]"
            >
              Continue
            </button>

            {/* Terms */}
            <p className="text-[15px] text-[#b5bac1] mt-2">
              By registering, you agree to Riscol’s{" "}
              <span className="text-[#00a8fc] underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-[#00a8fc] underline">Privacy Policy</span>.
            </p>

            {/* Already have account */}
            <p
              className="text-sm text-[#00a8fc] mt-2 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Already have an account?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
