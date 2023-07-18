import React from 'react';

import Input from '../Input/Input';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { TranslationContext } from '../../utils/user';

import './Profile.css';

function Profile() {

    const user = React.useContext(TranslationContext);
    const validation = useFormAndValidation();

    // Hooks

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
        console.log('logout');
    }

    const handleChange = (e) => {
        validation.handleChange(e);
    }

    // Render

    return (
        <form className='profile' noValidate onSubmit={edit}>

            <h2 className='profile__title'>Привет, {user.name}!</h2>

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


            <button
                className={`profile__button profile__button_type_logout`}
                type='button'
                onClick={logout}
            >
                Выйти из аккаунта
            </button>

        </form >
    );


}

export default Profile;