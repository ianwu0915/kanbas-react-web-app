import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="form-control mb-2"
        placeholder="username"
      />
      <input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        className="form-control mb-2"
        placeholder="password"
      />
      <select
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        className="form-control mb-2"
      >
        <option value="">Select role</option>
        <option value="STUDENT">STUDENT</option>
        <option value="FACULTY">FACULTY</option>
      </select>
      <button onClick={signup} className="btn btn-primary mb-2">
        {" "}
        Sign up{" "}
      </button>
      <br />
      <Link to="/Kanbas/Account/Signin">Sign in</Link>
    </div>
  );
}
