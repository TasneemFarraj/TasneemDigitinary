const Button = ({className, text, onClick, disabled}) => {
    return (
        <button 
          type="button"
          className={`button ${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      );
    };
    
    export default Button;