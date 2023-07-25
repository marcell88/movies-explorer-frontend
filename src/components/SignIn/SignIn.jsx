import React from 'react';
import Input from '../Input/Input';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import './SignIn.css';
import logoPath from '../../images/logo.svg';

function SignIn({ goToLanding, goToLogin, goToRegistration, handleLogin }) {

    const validation = useFormAndValidation();

    // Hooks

    React.useEffect(() => {
        validation.resetForm();
    }, []);


    //Callbacks

    const signin = (e) => {
        e.preventDefault();
        handleLogin(validation.values['password'], validation.values['email']);
    }

    const handleChange = (e) => {
        validation.handleChange(e);
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
                        defaultValue=''
                        isFormValid={validation.isValid}
                        isInputValid={validation.errorFlags['email'] || validation.errorFlags['email'] === undefined}
                        errorText={validation.errors['email']}
                        onChange={handleChange}
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
                        defaultValue=''
                        isFormValid={validation.isValid}
                        isInputValid={validation.errorFlags['password'] || validation.errorFlags['password'] === undefined}
                        errorText={validation.errors['password']}
                        onChange={handleChange}
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