export const termsAndConditions = value => (value ? undefined : 'You should agree with our terms and conditions');
export const imageRequired = value => (value ? undefined : 'A good quality Image is required');
export const required = value => (value ? undefined : 'This field is required');
export const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const isNumber = value => !(value && isNaN(Number(value)));
export const number = value => !isNumber(value) ? 'Must be a number' : undefined;
export const minValue = min => value => value && value < min ? `Must be higher than ${min}` : undefined;
export const maxValue = max => value => value && value > max ? `Must be lower than ${max}` : undefined;
export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
export const tooOld = value => value && value > 65 ? 'You might be too old for this' : undefined;
export const aol = value => value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined;
export const alphaNumeric = value => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;
export const phoneNumber = value => value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? 'Invalid phone number, must be 10 digits' : undefined;
export const confirmPassword = values => {
    const errors = {};

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Password mismatched' ;
    }

    return errors;
};