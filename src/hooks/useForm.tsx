import { useState, useEffect, useMemo } from 'react';

export interface FormValidation {
  [key: string]: [(params: any) => boolean, string | undefined];
}

export interface FormErrors {
  [key: string]: null | string;
}

export interface InputProperties {
  touched: boolean;
  value: any;
}

export function useForm<T extends Record<string, any>>(
  initialForm: T,
  formValidations: FormValidation = {}
) {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setformValidation] = useState({} as FormErrors);
  const initialInputProperties: Record<string, InputProperties> = {};
  Object.keys(initialForm).map((key) => {
    initialInputProperties[key] = { touched: false, value: initialForm[key] };
  });
  const [inputProperties, setInputProperties] = useState(
    initialInputProperties
  );

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

  const onInputChange = (data: any) => {
    const { target } = data;
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });

    setInputProperties({
      ...inputProperties,
      [name]: {
        touched: true,
        value,
      },
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

  const isFormValueValid = (inputName: string): boolean =>
    formValidation[`${inputName}Valid`] !== null &&
    inputProperties[inputName]?.touched;

  const showFormValueInvalidMessage = (inputName: string): string | null =>
    isFormValueValid(inputName) ? formValidation[`${inputName}Valid`] : '';

  return {
    ...formState,
    ...formValidation,
    formValidation,
    formState,
    isFormValid,
    inputProperties,
    setFormState,
    onInputChange,
    onResetForm,
    isFormValueValid,
    showFormValueInvalidMessage,
  };
}
