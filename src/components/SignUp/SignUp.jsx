import React from 'react';
import Input from '../Input/Input';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import './SignUp.css';
import logoPath from '../../images/logo.svg';

function SignUp({ goToLanding, goToLogin, goToRegistration }) {

    const validation = useFormAndValidation();

    // Hooks

    React.useEffect(() => {
        validation.resetForm();
    }, []);


    //Callbacks

    const signup = (e) => {
        e.preventDefault();
        console.log('signup');
    }

    const handleChange = (e) => {
        validation.handleChange(e);
    }

    // Render

    return (
        <section className='signup'>

            <form className='signup__form' noValidate onSubmit={signup}>
                <div className='signup__form-cont'>

                    <button
                        className='signup__logo-button'
                        type='button'
                        onClick={goToLanding}
                    >
                        <img className='signup__logo' src={logoPath} alt='Логотип' />
                    </button>
                    <h2 className='signup__title'>Добро пожаловать!</h2>

                    <Input
                        inputElement='signup__input'
                        inputErrorModificator='signup__input_error'
                        labelElement='signup__label'
                        errorElement='signup__error'
                        labelText='Имя'
                        defaultValue=''
                        isFormValid={validation.isValid}
                        isInputValid={validation.errorFlags['name'] || validation.errorFlags['name'] === undefined}
                        errorText={validation.errors['name']}
                        onChange={handleChange}
                        type='text'
                        name='name'
                        id='input-name'
                        placeholder='Введите имя'
                        minLength='2'
                        maxLength='30'
                        required
                    />

                    <Input
                        inputElement='signup__input'
                        inputErrorModificator='signup__input_error'
                        labelElement='signup__label'
                        labelText='E-mail'
                        errorElement='signup__error'
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
                        inputElement='signup__input'
                        inputErrorModificator='signup__input_error'
                        labelElement='signup__label'
                        labelText='Пароль'
                        errorElement='signup__error'
                        defaultValue=''
                        isFormValid={validation.isValid}
                        isInputValid={validation.errorFlags['password'] || validation.errorFlags['password'] === undefined}
                        errorText={validation.errors['password']}
                        onChange={handleChange}
                        type='password'
                        name='password'
                        id='input-pass'
                        placeholder='Введите пароль'
                        required
                    />

                </div>

                <button
                    className={`signup__button ${validation.isValid ? '' : 'signup__button_disabled'}`}
                    disabled={!validation.isValid}
                    type='submit'
                >
                    Зарегистрироваться
                </button>

            </form >

            <div className='signup__footer-button-cont'>
                <button
                    className={`signup__footer-button`}
                    type='button'
                    onClick={goToLogin}
                >
                    <span className='signup__footer-button-text'>Уже зарегистрированы?</span>
                    Войти
                </button>
            </div>

        </section>

    );


}

export default SignUp;