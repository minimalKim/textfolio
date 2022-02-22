import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SignInForm } from '../components/SignInForm';
import { SignUpForm } from '../components/SignUpForm';
import { useAppSelector } from '../store';

export default function WelcomePage() {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const user = useAppSelector(({ auth }) => auth.user);
  const navigate = useNavigate();
  const optionInText = isSignInPage ? ['Not registered yet?', 'Sign up'] : ['Already Signed up?', 'Sign in'];

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);

  return (
    <div>
      {isSignInPage ? <SignInForm /> : <SignUpForm />}
      <div>
        <span>{optionInText[0]}</span>
        <button type='button' onClick={() => setIsSignInPage(!isSignInPage)}>
          {optionInText[1]}
        </button>
      </div>
    </div>
  );
}
