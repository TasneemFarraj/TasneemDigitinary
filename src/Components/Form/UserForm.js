import { useState } from 'react';
import FormInput from './FormInput';
import Button from '../Button';
import '../../Style/Form.css';


const UserForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    country: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const countries = ['Jordan', 'Egypt', 'Syria', 'Palestine', 'Qatar', 'Yaman'];

  const validateField = (name, value) => {
    let error = '';
  
    const valueToValidate = name === 'terms' ? value : String(value).trim();
  
    if (valueToValidate === '' && name !== 'terms') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
      return;
    }

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
      case 'phone':
        if (!/^\d{10}$/.test(value)) error = 'Phone number must be 10 digits.';
        break;
      case 'age':
        if (value < 18 || value > 65) error = 'Age must be between 18 and 65.';
        break;
      case 'country':
        if (!value) error = 'Please select a country.';
        break;
      case 'terms':
        if (!value) error = 'You must agree to the terms.';
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    validateField(name, fieldValue);
  };

  const isFormValid = () =>
    Object.values(formData).every((value) => value) &&
    Object.values(errors).every((error) => !error);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Form Data:', formData);
      alert('Form submitted successfully!');
    } else {
      alert('Please fix the errors in the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Full Name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        placeholder="Enter your full name"
        required={true}
        helperText="Enter your full legal name."


      />
      <FormInput
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        required={true}
        helperText="Provide a valid email address contain @ and dot"


      />
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter a strong password"
        required={true}
        helperText="Password should be at least 8 characters long contains at least 1 upper case and 1 special char and number."


      />
      <FormInput
        label="Phone Number"
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder="Enter your phone number"
        required={true}
        helperText="Include your country code (e.g., +1, +44)."


      />
      <FormInput
        label="Age"
        type="text"
        name="age"
        value={formData.age}
        onChange={handleChange}
        error={errors.age}
        placeholder="Enter your age"
        required={true}
        helperText="Provide your age."

      />
      <FormInput
        label="Country"
        type="select"
        name="country"
        value={formData.country}
        onChange={handleChange}
        options={countries}
        error={errors.country}
        required={true}
        helperText="Select the country you currently reside in."


      />
      <div className="form-group agree-group">
        <label htmlFor="terms" className="form-label agree-label">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="form-input-checkbox"
            helperText="You must agree to proceed."

          />
          Agree to Terms
        </label>
        {errors.terms && <p className="form-error">{errors.terms}</p>}
      </div>
      <Button
        text="Submit"
        onClick={handleSubmit}
        disabled={!isFormValid()}
        className="primary"
      />
    </form>
  );
};

export default UserForm;
