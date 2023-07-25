import React from 'react';

import Input from '../Input/Input';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';

function Profile({ handleLogout }) {

    const user = React.useContext(CurrentUserContext);

    // Hooks

    const validation = useFormAndValidation();

    React.useEffect(() => {
        validation.resetForm(true);
    }, []);


    //Callbacks

    const edit = (e) => {
        e.preventDefault();
        console.log('edit');
    }

    const logout = (e) => {
        e.preventDefault();
        handleLogout();
    }

    const handleChange = (e) => {
        validation.handleChange(e);
    }

    // Render

    return (
        <main className='profile'>
            <form className='profile__form' noValidate onSubmit={edit}>

                <h1 className='profile__title'>Привет, {user.name}!</h1>

                <Input
                    inputElement='profile__input'
                    inputErrorModificator='profile__input_error'
                    labelElement='profile__label'
                    errorElement='profile__error'
                    labelText='Имя'
                    defaultValue={user.name}
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
                    inputElement='profile__input'
                    inputErrorModificator='profile__input_error'
                    labelElement='profile__label'
                    labelText='E-mail'
                    errorElement='profile__error'
                    defaultValue={user.email}
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