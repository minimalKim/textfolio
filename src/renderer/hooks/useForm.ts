import { useState } from 'react';

type useFormProps<T> = {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate?: (values: T) => Partial<T>;
};

const checkInitialValuesHasEmail = <T>(initialValues: T): boolean => 'email' in initialValues;
const checkInitialValuesHasPassword = <T>(initialValues: T): boolean => 'password' in initialValues;

const defaultEmailValidate = <T extends { email: string }>({ email }: T): Partial<T> => {
  const errors: Partial<T> = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!email.length) errors.email = '이메일을 입력해 주세요';
  else if (!emailRegex.test(email)) errors.email = '유효한 이메일이 아닙니다';

  return errors;
};

const defaultPasswordValidate = <T extends { password: string }>({ password }: T): Partial<T> => {
  const errors: Partial<T> = {};
  const passwordAsteriskRegex = /^(?=.*[!@#$%^*+=-]).{6,16}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/i;

  if (!password.length) errors.password = '비밀번호를 입력해 주세요';
  else if (!passwordAsteriskRegex.test(password))
    errors.password = '비밀번호에 특수문자(!@#$%^*+=-) 중 하나를 포함해주세요';
  else if (!passwordRegex.test(password))
    errors.password = '6 ~ 16자의 영문 + 숫자 + 특수문자(!@#$%^*+=-) 조합의 비밀번호를 입력해 주세요';

  return errors;
};

const useForm = <T extends { [key: string]: string }>({
  initialValues,
  onSubmit,
  validate,
}: useFormProps<T>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<T>>();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();

    let newError = validate ? validate(values) : {};

    if (checkInitialValuesHasEmail(initialValues)) {
      const emailError = defaultEmailValidate(values as unknown as { email: string });
      newError = { ...newError, ...emailError };
    }
    if (checkInitialValuesHasPassword(initialValues)) {
      const passwordError = defaultPasswordValidate(values as unknown as { password: string });
      newError = { ...newError, ...passwordError };
    }

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
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
