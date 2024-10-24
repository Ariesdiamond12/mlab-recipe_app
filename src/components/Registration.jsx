import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Platter from "../assets/platter.jpg";

function Registration() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/login");
      } else {
        setError("Error registering user");
      }
    } catch (error) {
      setError("Error registering user");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Platter})` }}
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-0"></div>

      {/* Form container */}
      <div className="flex justify-center items-center h-full relative z-10">
        <form className="max-w-[400px] w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-medium text-center py-4">
            Create An Account
          </h2>
          <div className="flex flex-col py-2">
            <label>Name</label>
            <input
              className="border p-2 rounded-lg"
              type="text"
              value={name}
              required
              minLength="3"
              maxLength="8"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Surname</label>
            <input
              className="border p-2 rounded-lg"
              type="text"
              value={surname}
              required
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Email Address</label>
            <input
              className="border p-2 rounded-lg"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border p-2 rounded-lg"
              type="password"
              value={password}
              required
              minLength="6"
              maxLength="20"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            className="w-full my-4 py-4 rounded-full bg-[#A10702] shadow-lg text-white"
            type="submit"
            onClick={handleRegister}
          >
            Create Account
          </button>
          <div>
            <p>
              Already have an account?{" "}
              <a className="text-[#A10702]" href="/login">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
