import { Link, Outlet } from "react-router-dom";
import { AppRoute } from "../../constants";
import { useAppSelector } from "../../hooks";
import { getAuthInfo } from "../../store/user-process/selectors";

const Header = () => {
  const userInfo = useAppSelector(getAuthInfo);
  return (
    <div>
      <header className="header" id="header">
        <div className="container">
          <div className="header__wrapper"><a className="header__logo logo" href="main.html">
            <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/></a>
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to={`${AppRoute.Products}`}>Каталог</Link>
                </li>
                <li className="main-nav__item"><a className="link main-nav__link" href="#">Где купить?</a>
                </li>
                <li className="main-nav__item"><a className="link main-nav__link" href="#">О компании</a>
                </li>
              </ul>
            </nav>
            <div className="header__container">
              <span className="header__user-name">{userInfo?.name}</span>
            <Link className="header__link" to={AppRoute.Login} aria-label="Перейти в личный кабинет">
                <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-account"></use>
                </svg><span className="header__link-text">Вход</span>
            </Link>
            </div>

          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
