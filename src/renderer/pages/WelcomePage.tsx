import React, { useState } from 'react';

import { SignInForm } from '../components/SignInForm';
import { SignUpForm } from '../components/SignUpForm';

export default function WelcomePage() {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const optionInText = isSignInPage ? ['Not registered yet?', 'Sign up'] : ['Already Signed up?', 'Sign in'];

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
