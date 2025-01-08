export const validateField = (name, value) => {
  let error = "";

  switch (name) {
    case 'fullName':
      if (value.trim().length < 3) error = 'Full name must be at least 3 characters.';
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = 'Invalid email format.';
      break;
    case 'password':
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(value))
        error = 'Password must be at least 8 characters, include a number and a special character.';
      break;
    default:
      break;
  }

  return error;
};
