import React from 'react';

import Input from '../Input/Input';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { emailRegExp } from '../../utils/constants';

import './Profile.css';

function Profile({ handleProfileUpdate, handleLogout, isLoading }) {

    const user = React.useContext(CurrentUserContext);

    // Hooks

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const validation = useFormAndValidation();

    React.useEffect(() => {
        if (user.name && user.email) {
            setName(user.name);
            setEmail(user.email);
        }
        validation.resetForm(false);
    }, [user]);

    React.useEffect(() => {
        if (user.name === name && user.email === email) {
            validation.resetForm(false);
        }
    }, [name, email]);

    //Callbacks

    const edit = (e) => {
        e.preventDefault();
        validation.resetForm(false);
        handleProfileUpdate(name, email);
    }

    const logout = (e) => {
        e.preventDefault();
        handleLogout();
    }

    const handleNameChange = (evt) => {
        setName(evt.target.value);
        validation.handleChange(evt);
    }

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
        validation.handleChange(evt);
    }

    // Render

    return (
        <main className='profile'>
            <form className='profile__form' noValidate onSubmit={edit}>

                <h1 className='profile__title'>Привет, {name}!</h1>

                <Input
                    inputElement='profile__input'
                    inputErrorModificator='profile__input_error'
                    labelElement='profile__label'
                    errorElement='profile__error'
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
                    inputElement='profile__input'
                    inputErrorModificator='profile__input_error'
                    labelElement='profile__label'
                    labelText='E-mail'
                    errorElement='profile__error'
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

                <button
                    className={`profile__button ${validation.isValid ? '' : 'profile__button_disabled'}`}
                    disabled={!validation.isValid}
                    type='submit'
                >
                    Редактировать
                </button>
            </form >

            <button
                className={`profile__button profile__button_type_logout`}
                type='button'
                onClick={logout}
            >
                Выйти из аккаунта
            </button>

        </main >

    );


}

export default Profile;