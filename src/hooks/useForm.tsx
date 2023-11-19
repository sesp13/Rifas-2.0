import { useState } from 'react';

type inputChangeType = { target: { name: string; value: any } };

export const useForm = (initialForm: any) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }: inputChangeType) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};
