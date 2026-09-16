export const EMAIL_MAX_LENGTH = 254;
export const PASSWORD_MAX_LENGTH = 128;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
    const trimmed = email.trim();
    return trimmed.length > 0 && trimmed.length <= EMAIL_MAX_LENGTH && EMAIL_PATTERN.test(trimmed);
}

export function isValidPassword(password) {
    return password.length > 0 && password.length <= PASSWORD_MAX_LENGTH;
}
