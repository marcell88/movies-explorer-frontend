import React from 'react';
import Input from '../Input/Input';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import searchLabel from '../../images/search-label.svg';
import searchButton from '../../images/search-button.svg';
import './SearchForm.css';

function SearchForm() {

    // Hooks

    React.useEffect(() => {
        validation.resetForm();
    }, []);

    const validation = useFormAndValidation();

    // Callbacks
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.find.value);
        console.log(e.target.short.checked);
    }

    const handleChange = (e) => {
        validation.handleChange(e);
    }

    return (
        <div className='search'>

            <form className='search__form' name='search' onSubmit={onSubmit} noValidate>

                <fieldset className='search__input-container'>

                    <label className='search__input-label'>
                        <img className='search__input-label-icon' src={searchLabel} alt='Искать' />
                    </label>

                    <input
                        className='search__input'
                        onChange={handleChange}
                        type='text'
                        name='find'
                        required={true}
                        placeholder='Фильм'
                    />

                    <button className='search__button' type='submit' disabled={!validation.isValid}>
                        <img className='search__input-button-icon' src={searchButton} alt='Искать' />
                    </button>

                </fieldset>

                <fieldset className='search__checkbox-container'>
                    <label className='search__checkbox-label' htmlFor='short-checkbox'>Короткометражки
                        <input type='checkbox' name='short' id='short-checkbox' className='search__checkbox' />
                        <span className='search__checkbox-border'></span>
                        <span className='search__checkbox-circle'></span>
                    </label>
                </fieldset>

            </form>

        </div>
    );
}

export default SearchForm;
