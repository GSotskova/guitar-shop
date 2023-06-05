import {useRef, FormEvent} from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import MetaInfo from '../../components/meta/meta';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginUser } from '../../store/api-actions';
import { getHasErrorLogin } from '../../store/user-process/selectors';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

function LoginPage(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const isErrorLogin = useAppSelector(getHasErrorLogin);

  if (isErrorLogin) {
    toast.warn('Сервер не доступен. Попробуйте зайти позднее');
  }
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(loginUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  return (
    <div>
      <MetaInfo/>
      <Header/>
      <div className="wrapper">
        <main className="page-content">
          <div className="container">
            <section className="login">
              <h1 className="login__title">Войти</h1>
              <p className="login__text">Hовый пользователь?
              <Link className="login__link" to={AppRoute.Registration}>
                Зарегистрируйтесь
                </Link> прямо сейчас</p>
              <form method="post" action="#" onSubmit={handleFormSubmit}>
                <div className="input-login">
                  <label htmlFor="email">Введите e-mail</label>
                  <input type="email" id="email" name="email" ref={emailRef} autoComplete="off" required/>
                  <p className="input-login__error">Заполните поле</p>
                </div>
                <div className="input-login">
                  <label htmlFor="passwordLogin">Введите пароль</label><span>
                    <input type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" ref={passwordRef} autoComplete="off" required/>
                    <button className="input-login__button-eye" type="button">
                      <svg width="14" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-eye"></use>
                      </svg>
                    </button></span>
                  <p className="input-login__error">Заполните поле</p>
                </div>
                <button className="button login__button button--medium" type="submit">Войти</button>
              </form>
            </section>
          </div>
        </main>
      </div>
      <Footer/>
  </div>
  )
}

export default LoginPage;
