import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <>

      {/* <header className="header">
        <img className="header__logo" src={logo} alt="лого место" />
        <Link to="/sign-up" className="header__nav-link">
          Регистрация
        </Link>
      </header> */}

      {/* <Link to="/sign-up" className="header__nav-link">
        Регистрация
      </Link> */}

      <form className="entry-form" onSubmit={handleSubmit}>
        <h2 className="entry-form__title">Вход</h2>
        <input
          // value={formParams.email}
          onChange={handleEmailInput}
          name="email"
          type="email"
          className="entry-form__input"
          placeholder="Email"
          // autoComplete="off"
          value={email}
          required
        ></input>
        <span className="entry-form__input-error"></span>
        <input
          // value={formParams.password}
          onChange={handlePasswordInput}
          name="password"
          type="password"
          className="entry-form__input"
          placeholder="Пароль"
          // autoComplete="off"
          value={password}
          autoComplete="on"
          required
        ></input>
        <span className="entry-form__input-error"></span>
        <button type="submit" className="entry-form__button">
          Войти
        </button>
      </form>
    </>
  );
}

export default Login;