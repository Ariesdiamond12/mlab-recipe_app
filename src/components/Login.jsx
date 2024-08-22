import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cheese from "../assets/cheese.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call to authenticate user
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        // Store user data in local storage
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error authenticating user");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <form className="max-w-[400px] w-full mx-auto p-4">
            <h1 className="text-3xl font-normal text-center">
              Login to your Account
            </h1>
            <div className="flex flex-col py-2">
              <label>Username</label>
              <input
                className="border p-2 rounded-lg"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Password</label>
              <input
                className="border p-2 rounded-lg"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              className="w-full my-4 py-4 rounded-full bg-[#A10702] shadow-lg shadow-[#A10702] text-white"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <div>
              <p>
                Don't have an account yet?{" "}
                <a className="text-[#A10702]" href="./Registration">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Right Column */}
        <div
          className="hidden sm:block mx-3 my-2 rounded-xl"
          style={{
            backgroundImage: `url(${Cheese})`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div
        className="flex justify-start"
        style={{ transform: "translateY(-5dvh)" }}
      ></div>
    </>
  );
}

export default Login;
