import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '../components/common/Button/Button';
import Card from '../components/common/Card/Card';
import Text from '../components/common/Text/Text';
import { SignInForm } from '../components/SignInForm';
import { SignUpForm } from '../components/SignUpForm';
import { useAppSelector } from '../store';

export default function WelcomePage() {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const user = useAppSelector(({ auth }) => auth.user);
  const navigate = useNavigate();
  const [guidanceMessage, anotherSignOption] = isSignInPage
    ? ['Not registered yet?', 'Sign up']
    : ['Already signed up?', 'Sign in'];

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);

  return (
    <WelcomePageWrapper>
      <RightSection>
        <Card padding={10} style={{ width: '550px' }}>
          {isSignInPage ? <SignInForm /> : <SignUpForm />}
        </Card>
        <OptionContainer>
          <Text block size='sm' color='#3a4250'>
            {guidanceMessage}
          </Text>
          <Button link type='button' colorTheme='tertiary' onClick={() => setIsSignInPage(!isSignInPage)}>
            {anotherSignOption}
          </Button>
        </OptionContainer>
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

// const LeftSection = styled.div`
//   background-color: orange;
//   width: 420px;
//   height: 400px;
//   margin-left: auto;
//   margin-right: auto;
// `;

const RightSection = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space[6]};
  > * + * {
    margin-left: ${({ theme }) => theme.space[4]};
  }
`;
