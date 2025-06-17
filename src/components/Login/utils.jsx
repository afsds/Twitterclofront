export const MESSAGE_DISPLAY_DURATION = 4000;

export const setTemporaryMessageClear = (setMessageFunction) => {
    setTimeout(() => {
        setMessageFunction('');
    }, MESSAGE_DISPLAY_DURATION);
};

export const validatePasswordStrength = (password) => {
    const lengthValid = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValid = lengthValid && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;

    return {
        isValid,
        errors: {
            length: lengthValid ? null : "Min. 8 chars,",
            upperCase: hasUpperCase ? null : "1 uppercase,",
            lowerCase: hasLowerCase ? null : "1 lowercase,",
            numbers: hasNumbers ? null : "1 number,",
            specialChars: hasSpecialChars ? null : "1 special char.",
        },
    };
};
