import React from 'react';

function InputSearch({ inputElement, inputErrorModificator, labelElement, labelText, errorElement,
    value, onChange, isFormValid, isInputValid, errorText, defaultValue, ...stdInputProps }) {

    return (
        <input className={`${inputElement}`}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            type={stdInputProps.type}
            name={stdInputProps.name}
            id={stdInputProps.id}
            placeholder={stdInputProps.placeholder}
            required={stdInputProps.required}
            checked={stdInputProps.checked}
        />
    )

}

export default InputSearch;
