import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Email from "@mui/icons-material/AlternateEmail";
import Pass from "@mui/icons-material/Key";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LOGO from "../../assets/images/MainLogoBlack.svg";
import "../Register/index.css";
import validateEmail from "../../utils/validateEmail";
import validatePassword from "../../utils/validatePassword";
import { useDispatch } from "react-redux";
import axios from "axios";
import apis from "../../services/api";
import { me } from "../../store/authSlice";
import FieldError from "../../components/FieldError";
import useNotification from "../../hooks/useNotification";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const notification = useNotification();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputRefs = {
    email: useRef(),
    password: useRef(),
  };

  const [formErrors, setFormErrors] = useState({
    email: {
      visible: false,
      message: "Please enter a valid email",
    },
    password: {
      visible: false,
      message: "Please enter a valid password",
    },
  });

  const handleFormData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = { ...formErrors };
    let hasError = false;
    for (let key in formErrors) {
      if (key === "email") {
        if (!validateEmail(formData.email)) {
          errors.email.visible = true;
          hasError = true;
        } else {
          errors.email.visible = false;
        }
      } else if (key === "password") {
        if (!validatePassword(formData.password)) {
          errors.password.visible = true;
          hasError = true;
        } else {
          errors.password.visible = false;
        }
      }
    }
    setFormErrors(errors);

    return hasError;
  };

  function handleKeyPress(event, field) {
    if (event.key === "Enter") {
      event.preventDefault();

      if (field === "email") {
        inputRefs.password.current.focus();
      } else if (field === "password") {
        submit();
      }
    }
  }

  const submit = async () => {
    let hasError = validateForm();

    if (hasError) return notification.error("Please fill the form correctly");

    try {
      await axios.post(apis.login, {
        email: formData.email,
        password: formData.password,
      });

      dispatch(me());
      navigate("/");
    } catch (err) {
      notification.error(err.response.data.error);
    }
  };

  return (
    <div className="mobile_auth">
      <div className="container">
        <Link to="/">
          <img src={LOGO} alt="logo"></img>
        </Link>
        <div className="registration_form">
          <div
            className="inp"
            style={
              formErrors.email.visible ? { borderColor: "var(--red)" } : {}
            }
          >
            <Email></Email>
            <input
              type="email"
              name=""
              id=""
              ref={inputRefs.email}
              placeholder="Email"
              onKeyPress={(e) => handleKeyPress(e, "email")}
              onChange={(e) => handleFormData("email", e.target.value)}
            />
          </div>
          <FieldError
            error={formErrors.email.message}
            visible={formErrors.email.visible}
          />
          <div
            className="inp"
            style={
              formErrors.password.visible ? { borderColor: "var(--red)" } : {}
            }
          >
            <Pass></Pass>
            <input
              type={show ? "text" : "password"}
              name=""
              id=""
              ref={inputRefs.password}
              placeholder="Password"
              onChange={(e) => handleFormData("password", e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, "password")}
            />

            {!show ? (
              <VisibilityOffIcon onClick={() => setShow(!show)} />
            ) : (
              <VisibilityIcon onClick={() => setShow(!show)} />
            )}
          </div>
          <FieldError
            error={formErrors.password.message}
            visible={formErrors.password.visible}
          />
          <button className="btn_classic" onClick={submit}>
            {" "}
            Sign In
          </button>
          <div className="links">
            <p></p>
            <Link to="/forgot-password">
              {" "}
              <span>Forgot Password?</span>
            </Link>
          </div>
          <p className="hr_line">
            {" "}
            <hr />
            or continue with <hr />
          </p>
          <div className="sign_in_options">
            <div>
              <button>
                <GoogleIcon></GoogleIcon>
                Google
              </button>
              <button>
                <FacebookIcon></FacebookIcon>
                Facebook
              </button>
            </div>
          </div>
          <div className="sign_up_cont">
            <Link to="/register">
              <button className="btn_classic" onClick={() => {}}>
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
