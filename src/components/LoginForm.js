import React, { useContext, useEffect, useState } from "react";
import useInput from "./hook/useInput";
import "./Login.css";
import MessageContext from "./templates/MessageContext";
import { useNavigate } from "react-router-dom"
function LoginForm() {
  const [formValid, setFormValid] = useState(false);
  let [showPassword, setShowPassword] = useState(false);
  let ctx = useContext(MessageContext);
  let {
    input: nameInput,
    inputValid: nameValid,
    inputIsValid: nameIsValid,
    onChangeHandler: onNameChange,
    onBlurHandler: onNameBlur,
    resetInput: nameReset,
  } = useInput((value) => value.trim().length === 0);

  let {
    input: passwordInput,
    inputValid: passwordValid,
    inputIsValid: passwordIsValid,
    onChangeHandler: onpasswordChange,
    onBlurHandler: onpasswordBlur,
    resetInput: passwordReset,
  } = useInput((value) => value.trim().length < 7 || value.trim().length === 0);

  let s = useNavigate();
  let onSubmitHandler = (event) => {
    event.preventDefault();
    if (nameValid || passwordValid) {
      return;
    }
    console.log(nameInput, " ", passwordInput);
    ctx.setContexts(nameInput,true);
    s.replace("/");
    nameReset();
    passwordReset();
  };

  let onShowClickHandler = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (!nameValid && !passwordValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [nameValid, passwordValid]);

  return (
    <div className="infor">
      <form autoComplete="off" onSubmit={onSubmitHandler}>
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
          {nameIsValid && <p className="error-p">*Name Required</p>}
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
          {passwordIsValid && <p className="error-p">*Password Required</p>}
        </div>
        <button className="Log_Button" disabled={!formValid} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}
export default LoginForm;