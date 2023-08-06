import React from "react";

export function useFormAndValidation() {
    const [values, setValues] = React.useState({}); //nameOfInput: valueOfInput
    const [errors, setErrors] = React.useState({}); //nameOfInput: errorMeassage
    const [errorFlags, setErrorFlags] = React.useState({}); //nameOfInput: errorFlag
    const [isValid, setIsValid] = React.useState(true); //status of all inputs (true or false)

    const handleChange = (e) => {
        //e.target -> input where chage occured
        const { name, value } = e.target;

        //add values and error messages to the arrays of inputs, status - for all form
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        setErrorFlags({ ...errorFlags, [name]: e.target.checkValidity() });
        setIsValid(e.target.closest('form').checkValidity());
    };

    //reset form validation
    const resetForm = React.useCallback((newIsValid = false, newValues = {}, newErrors = {}, newErrorFlags = {}) => {
        setIsValid(newIsValid);
    }, [setIsValid]);

    return { values, errors, errorFlags, isValid, handleChange, resetForm, setValues, setErrorFlags, setIsValid };

}