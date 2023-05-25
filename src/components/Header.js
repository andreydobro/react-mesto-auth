import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, email, onSignout, isLoginHref }) {

  return (
    <header className="header">
      <div className="header__logo" />
      <nav className='header__nav'>
        <ul className='header__list'>
          <li>
            <div className='header__user'>{isLoggedIn ? email : ''}</div>
          </li>
          <li>
            <Link
              to='/'
              className='header__button'
              onClick={onSignout}>
              {isLoggedIn ? 'Выйти' : ''}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;