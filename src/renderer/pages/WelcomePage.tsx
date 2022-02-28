import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Card from '../components/common/Card/Card';
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
    <WelcomePageWrapper>
      <LeftSection>image</LeftSection>
      <RightSection>
        <Card>
          {isSignInPage ? <SignInForm /> : <SignUpForm />}
          <span>{optionInText[0]}</span>
          <button type='button' onClick={() => setIsSignInPage(!isSignInPage)}>
            {optionInText[1]}
          </button>
        </Card>
      </RightSection>
    </WelcomePageWrapper>
  );
}

const WelcomePageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
`;

const LeftSection = styled.div`
  background-color: orange;
  width: 420px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const RightSection = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
