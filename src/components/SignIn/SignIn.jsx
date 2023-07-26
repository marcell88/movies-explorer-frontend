import React from 'react';
import Input from '../Input/Input';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import './SignIn.css';
import logoPath from '../../images/logo.svg';

function SignIn({ goToLanding, goToLogin, goToRegistration, handleLogin }) {

    const validation = useFormAndValidation();
    const [pass, setPass] = React.useState('');
    const [email, setEmail] = React.useState('');

    // Hooks

    React.useEffect(() => {
        validation.resetForm();
    }, []);


    //Callbacks

    const signin = (e) => {
        e.preventDefault();
        handleLogin(pass, email);
    }

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
        validation.handleChange(evt);
    }

    const handlePassChange = (evt) => {
        setPass(evt.target.value);
        validation.handleChange(evt);
    }

    // Render

    return (
        <main className='signin'>

            <form className='signin__form' noValidate onSubmit={signin}>
                <div className='signin__form-cont'>

                    <button
                        className='signin__logo-button'
                        type='button'
                        onClick={goToLanding}
                    >
                        <img className='signin__logo' src={logoPath} alt='Логотип' />
                    </button>
                    <h1 className='signin__title'>Рады видеть!</h1>

                    <Input
                        inputElement='signin__input'
                        inputErrorModificator='signin__input_error'
                        labelElement='signin__label'
                        labelText='E-mail'
                        errorElement='signin__error'
                        value={email}
                        isFormValid={validation.isValid}
                        isInputValid={validation.errorFlags['email'] || validation.errorFlags['email'] === undefined}
                        errorText={validation.errors['email']}
                        onChange={handleEmailChange}
                        type='email'
                        name='email'
                        id='input-email'
                        placeholder='Введите почту'
                        required
                    />

                    <Input
                        inputElement='signin__input'
                        inputErrorModificator='signin__input_error'
                        labelElement='signin__label'
                        labelText='Пароль'
                        errorElement='signin__error'
                        value={pass}
                        isFormValid={validation.isValid}
                        isInputValid={validation.errorFlags['password'] || validation.errorFlags['password'] === undefined}
                        errorText={validation.errors['password']}
                        onChange={handlePassChange}
                        type='password'
                        name='password'
                        id='input-pass'
                        placeholder='Введите пароль'
                        minLength='6'
                        maxLength='30'
                        required
                    />

                </div>

                <button
                    className={`signin__button ${validation.isValid ? '' : 'signin__button_disabled'}`}
                    disabled={!validation.isValid}
                    type='submit'
                >
                    Войти
                </button>

            </form >

            <div className='signin__footer-button-cont'>
                <button
                    className={`signin__footer-button`}
                    type='button'
                    onClick={goToRegistration}
                >
                    <span className='signin__footer-button-text'>Еще не зарегистрированы?</span>
                    Регистрация
                </button>
            </div>

        </main>

    );


}

export default SignIn;