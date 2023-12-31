import React from 'react';

function Input({ inputElement, inputErrorModificator, labelElement, labelText, errorElement,
    value, onChange, isFormValid, isInputValid, errorText, defaultValue, ...stdInputProps }) {

    const validity = isFormValid || isInputValid;

    return (
        <label className={`${labelElement}`}>
            <span className={`${labelElement}-text`}>{labelText}</span>
            <input className={`${inputElement} ${!validity && inputErrorModificator}`}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                type={stdInputProps.type}
                name={stdInputProps.name}
                id={stdInputProps.id}
                placeholder={stdInputProps.placeholder}
                required={stdInputProps.required}
                minLength={stdInputProps.minLength}
                maxLength={stdInputProps.maxLength}
                pattern={stdInputProps.pattern}
                disabled={stdInputProps.disabled}
            />
            <span className={`${errorElement} ${!validity ? `${errorElement}_visible` : ''}`}>{errorText}</span>
        </label>
    )

}

export default Input;
