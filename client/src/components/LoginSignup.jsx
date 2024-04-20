import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, registerUserAction } from "../app/actions/userAction";

const LoginSignup = () => {
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();
  const { loading, otp, message } = useSelector((state) => state.user);

  //state
  const [toggleButton, setToggleButton] = useState("login");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  //function
  const hangleToggle = (text) => {
    setToggleButton(text);
  };

  const handleChangeLogin = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleChangeSignup = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(loginForm));
  };

  const signupSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserAction(signupForm));
  };

  //useEffect
  useEffect(() => {
    if (message) {
      navigate(`/register-verification/${otp}`);
    }
  });

  return (
    !loading && (
      <div className="login_signup_container">
        <div className="top">
          <span
            className={toggleButton === "login" ? "active" : "unactive"}
            onClick={() => hangleToggle("login")}
          >
            LOGIN
          </span>
          <span
            className={toggleButton === "signup" ? "active" : "unactive"}
            onClick={() => hangleToggle("signup")}
          >
            SIGNUP
          </span>
        </div>

        <hr />

        <div className="wrapper">
          {toggleButton === "login" ? (
            <form className="login_form" onSubmit={loginSubmit}>
              <div className="input_single_container">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleChangeLogin}
                />
              </div>

              <div className="input_single_container">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleChangeLogin}
                />
              </div>
              <button type="submit">LOGIN</button>
              <span>Forgot Password ?</span>
            </form>
          ) : (
            <>
              <form className="signup_form" onSubmit={signupSubmit}>
                <div className="input_single_container">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={signupForm.name}
                    onChange={handleChangeSignup}
                  />
                </div>

                <div className="input_single_container">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleChangeSignup}
                  />
                </div>

                <div className="input_single_container">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={signupForm.password}
                    onChange={handleChangeSignup}
                  />
                </div>

                <p>
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our{" "}
                  <Link to="/">privacy policy</Link>.
                </p>
                <button type="submit">SIGNUP</button>
              </form>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default LoginSignup;
