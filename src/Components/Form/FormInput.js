import React from 'react';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa'


const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  options,
  required,
  helperText,

}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => setShowTooltip(!showTooltip);
  const hideTooltip = () => setShowTooltip(false);
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
        {helperText && (
          <span
            className="helper-icon-wrapper"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={hideTooltip}
            onClick={toggleTooltip}
          >
            <FaInfoCircle className="helper-icon" />
            {showTooltip && (
              <div className="tooltip-box">
                {helperText}
              </div>
            )}
          </span>
        )}
        
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-input ${error ? 'input-error' : ''}`}
          aria-required={required}
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
        <input className={`form-input ${error ? 'input-error' : ''}`}

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
