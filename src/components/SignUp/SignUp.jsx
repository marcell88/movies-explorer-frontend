import React from 'react';
import Input from '../Input/Input';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { emailRegExp } from '../../utils/constants';


import './SignUp.css';
import logoPath from '../../images/logo.svg';

function SignUp({ isLoading, goToLanding, goToLogin, goToRegistration, handleRegister }) {

    const validation = useFormAndValidation();
    const [pass, setPass] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');

    // Hooks

    React.useEffect(() => {
        validation.resetForm();
    }, []);

    React.useEffect(() => {
        if (isLoading) {
            validation.resetForm(false);
        } else {
            validation.resetForm(true);
        }
    }, [isLoading])

    //Callbacks

    const signup = (e) => {
        e.preventDefault();
        handleRegister(pass, email, name);
    }

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
        validation.handleChange(evt);
    }

    const handlePassChange = (evt) => {
        setPass(evt.target.value);
        validation.handleChange(evt);
    }

    const handleNameChange = (evt) => {
        setName(evt.target.value);
        validation.handleChange(evt);
    }

    // Render

    return (
        <main className='signup'>

            <form className='signup__form' noValidate onSubmit={signup}>
                <div className='signup__form-cont'>

                    <button
                        className='signup__logo-button'
                        type='button'
                        onClick={goToLanding}
                    >
                        <img className='signup__logo' src={logoPath} alt='Логотип' />
                    </button>
                    <h1 className='signup__title'>Добро пожаловать!</h1>

                    <Input
                        inputElement='signup__input'
                        inputErrorModificator='signup__input_error'
                        labelElement='signup__label'
                        errorElement='signup__error'
                        labelText='Имя'
                        value={name}
                        isFormValid={validation.isValid}
                        isInputValid={validation.errorFlags['name'] || validation.errorFlags['name'] === undefined}
                        errorText={validation.errors['name']}
                        onChange={handleNameChange}
                        type='text'
                        name='name'
                        id='input-name'
                        placeholder='Введите имя'
                        minLength='2'
                        maxLength='30'
                        disabled={isLoading}
                        required
                    />

                    <Input
                        inputElement='signup__input'
                        inputErrorModificator='signup__input_error'
                        labelElement='signup__label'
                        labelText='E-mail'
                        errorElement='signup__error'
                        value={email}
                        isFormValid={validation.isValid}
                        isInputValid={validation.errorFlags['email'] || validation.errorFlags['email'] === undefined}
                        errorText={validation.errors['email']}
                        onChange={handleEmailChange}
                        type='email'
                        name='email'
                        id='input-email'
                        placeholder='Введите почту'
                        pattern={emailRegExp}
                        disabled={isLoading}
                        required
                    />

                    <Input
                        inputElement='signup__input'
                        inputErrorModificator='signup__input_error'
                        labelElement='signup__label'
                        labelText='Пароль'
                        errorElement='signup__error'
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
                        disabled={isLoading}
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

        </main>

    );


}

export default SignUp;