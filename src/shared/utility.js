export const updateObject = (oldObject, updateProperties) => {
  return {
    ...oldObject,
    ...updateProperties,
  };
};

export const checkValidation = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isPassword) {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isDate) {
    const pattern = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isGender) {
    const pattern = /m|f/gi;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isPhoneNumber) {
    const pattern = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
