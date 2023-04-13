import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    {
      /* So won't trigger when refresh */
    }
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful. Now you can log in");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        {/*input for the forms */}
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="adsfdsaf"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>

          {/* click here to register */}
          <div className="text-center py-2 text-gray-500">
            Already a member?
            <Link className="pl-1 underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
