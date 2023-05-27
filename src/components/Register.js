import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <>
      <form className="entry-form" onSubmit={handleSubmit}>
        <h2 className="entry-form__title">Регистрация</h2>
        <input
          value={email || ''}
          onChange={handleEmailInput}
          name="email"
          type="email"
          className="entry-form__input"
          placeholder="Email"
          autoComplete="off"
        ></input>
        <span className="entry-form__input-error"></span>
        <input
          value={password || ''}
          onChange={handlePasswordInput}
          name="password"
          type="password"
          className="entry-form__input"
          placeholder="Пароль"
          autoComplete="off"
        ></input>
        <span className="entry-form__input-error"></span>
        <button type="submit" className="entry-form__button">
          Зарегистрироваться
        </button>
        <div className="register-signin">
          <p className="register-signin__p">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register-signin__link">
            Войти
          </Link>
        </div>
      </form>
    </>
  );
}

export default Register;