import { useState } from 'react';

type useFormValues = { [key: string]: string };

type useFormProps<T> = {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate?: (values: T) => Partial<T>;
};

const useForm = <T extends { [key: string]: string }>({
  initialValues,
  onSubmit,
  validate,
}: useFormProps<T>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const newError = validate ? validate(values) : {};

    if (Object.keys(newError).length === 0) {
      await onSubmit(values);
      setValues(initialValues);
    }
    setErrors(newError);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
};
export default useForm;
