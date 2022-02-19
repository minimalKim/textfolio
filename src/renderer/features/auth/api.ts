import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../db/firestore';

const auth = getAuth(app);

type SignInApiData = {
  email: string;
  password: string;
};

export const signIn = async ({ email, password }: SignInApiData) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user.uid;
};
