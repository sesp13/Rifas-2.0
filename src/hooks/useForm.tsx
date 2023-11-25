import { useState, useEffect, useMemo } from 'react';

export interface FormValidation {
  [key: string]: [(params: any) => boolean, string];
}

export interface FormErrors {
  [key: string]: null | string;
}

export function useForm<T extends Record<string, any>>(
  initialForm: T,
  formValidations: FormValidation = {}
) {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setformValidation] = useState({} as FormErrors);

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) {
        return false;
      }
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: FormErrors = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = 'This field is required'] =
        formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setformValidation(formCheckedValues);
  };

  return {
    ...formState,
    ...formValidation,
    formValidation,
    formState,
    isFormValid,
    onInputChange,
    onResetForm,
  };
}
