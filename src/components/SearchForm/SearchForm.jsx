import React from 'react';
import InputSearch from '../InputSearch/InputSearch';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import searchLabel from '../../images/search-label.svg';
import searchButton from '../../images/search-button.svg';
import './SearchForm.css';

function SearchForm({ isLoading, handleSearch, handleSearchFilter, handleSubmit, initialSearch, initialCheckbox }) {

    const validation = useFormAndValidation();
    const [request, setRequest] = React.useState('');
    const [isShortOnly, setShortOnly] = React.useState(false);


    // Validation

    React.useEffect(() => {
        validation.resetForm();
        if (initialSearch) setRequest(initialSearch);
        if (initialCheckbox) setShortOnly(initialCheckbox);
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(request, isShortOnly);
    }

    React.useEffect(() => {
        if (isLoading) {
            validation.resetForm(false);
        } else {
            validation.resetForm(true);
        }
    }, [isLoading])


    const handleRequestChange = (e) => {
        setRequest(e.target.value);
        handleSearch(e.target.value);
        validation.handleChange(e);
    }

    const handleCheckboxChange = (e) => {
        setShortOnly(e.target.checked);
        handleSearchFilter(e.target.checked);
        validation.handleChange(e);
    }

    return (
        <div className='search'>

            <form className='search__form' name='search' onSubmit={onSubmit} noValidate>

                <fieldset className='search__input-container'>

                    <label className='search__input-label'>
                        <img className='search__input-label-icon' src={searchLabel} alt='Искать' />
                    </label>

                    <InputSearch
                        inputElement='search__input'
                        value={request}
                        onChange={handleRequestChange}
                        type='text'
                        name='find'
                        id='input-find'
                        placeholder='Фильм'
                        disabled={isLoading}
                    />

                    <button className='search__button' type='submit' disabled={!validation.isValid}>
                        <img className='search__input-button-icon' src={searchButton} alt='Искать' />
                    </button>

                </fieldset>

                <fieldset className='search__checkbox-container'>
                    <label className='search__checkbox-label' htmlFor='short-checkbox'>Короткометражки

                        <InputSearch
                            inputElement='search__checkbox'
                            value={isShortOnly}
                            checked={isShortOnly}
                            onChange={handleCheckboxChange}
                            type='checkbox'
                            name='short'
                            id='short-checkbox'
                            disabled={isLoading}
                        />

                        <span className='search__checkbox-border'></span>
                        <span className='search__checkbox-circle'></span>
                    </label>
                </fieldset>

            </form>

        </div>
    );
}

export default SearchForm;
