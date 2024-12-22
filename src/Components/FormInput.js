import React from 'react';

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  options,
}) => {

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="form-input"
        >
          <option value="">Select an option</option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      ) : (
        <input className="form-input"
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
         
        />
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FormInput;
