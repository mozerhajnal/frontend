export const handleChange = ({ target }, formData, setFormData) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  
  export const getValidationClassName = (errorMessage, wasValidated) => {
    const isValid = errorMessage === '';
    const additionalClass = '';
    if (wasValidated === 'was-validated') {
      return isValid ? 'is-valid' : 'is-invalid';
    }
    return additionalClass;
  };
  