import React, { useEffect, useState } from "react";
import useInput from "./hook/useInput";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Error_Log from "./templates/Error_Log";

function SignUpForm() {
  const [formValid, setFormValid] = useState(false);
  let [pending, setPending] = useState(false);
  let [error, setError] = useState(false);
  let [showPassword, setShowPassword] = useState(false);
  let {
    input: nameInput,
    inputValid: nameValid,
    inputIsValid: nameIsValid,
    onChangeHandler: onNameChange,
    onBlurHandler: onNameBlur,
  } = useInput((value) => value.trim().length === 0);

  let {
    input: passwordInput,
    inputValid: passwordValid,
    inputIsValid: passwordIsValid,
    onChangeHandler: onpasswordChange,
    onBlurHandler: onpasswordBlur,
  } = useInput((value) => value.trim().length < 6);

  let {
    input: emailInput,
    inputValid: emailValid,
    inputIsValid: emailIsValid,
    onChangeHandler: onEmailChange,
    onBlurHandler: onEmailBlur,
  } = useInput(
    (value) => !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  );

  let navigate = useNavigate();

  let onSubmitHandler = async (event) => {
    event.preventDefault();
    setPending(true);
    if (nameValid || passwordValid || emailValid) {
      return;
    }
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvTfBn1R1_dvqxwq7hwXMD3ptiH3Ex3s0",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        } else {
          return response.json().then((data) => {
            if (data || data.error) {
              setError(data.error.message);
            }
          });
        }
      })
      .finally(() => {
        setPending(false);
      });
  };

  let onShowClickHandler = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (!nameValid && !passwordValid && !emailValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [nameValid, passwordValid, emailValid]);
  let closeHandler = () => {
    setError(false);
  };
  return (
    <div className="infor">
      {error && <Error_Log Error={error} setClose={closeHandler} />}
      <form onSubmit={onSubmitHandler}>
        <div className="input_box">
          <label htmlFor="email" className="label">
            Email Addres
          </label>
          <input
            type="email"
            className="input"
            value={emailInput}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            placeholder="type Email"
            id="email"
            title="User Name"
          />
          {emailIsValid && <p className="error-p">*Email Not Valid</p>}
        </div>
        <div className="input_box">
          <label htmlFor="user" className="label">
            User name
          </label>
          <input
            type="text"
            className="input"
            value={nameInput}
            onChange={onNameChange}
            onBlur={onNameBlur}
            placeholder="type username"
            id="user"
            title="User Name"
          />
          {nameIsValid && <p className="error-p">*Name Not Valid</p>}
        </div>
        <div className="input_box">
          <label className="label" htmlFor="password">
            password
          </label>
          <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              className="inputx"
              onChange={onpasswordChange}
              onBlur={onpasswordBlur}
              value={passwordInput}
              placeholder="type Password"
              id="password"
              title="Password"
            />
            <span
              className="bi bi-eye-fill"
              id="show_hide_password"
              onClick={onShowClickHandler}
            ></span>
          </div>
          {passwordIsValid && <p className="error-p">*Enter Strong Password</p>}
        </div>
        {pending ? (
          <div className="loader"></div>
        ) : (
          <button className="Log_Button" disabled={!formValid} type="submit">
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
}
export default SignUpForm;
