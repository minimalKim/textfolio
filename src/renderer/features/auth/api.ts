import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../../db/firestore';

type SignInApiData = {
  email: string;
  password: string;
};

type SignUpApiData = SignInApiData & {
  username: string;
  avatar: string;
};

type UserProfileApiData = {
  uid: string;
  username: string;
  email: string;
  avatar: string;
};

export const signIn = async ({ email, password }: SignInApiData) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user.uid;
};

export const signUp = async ({ email, password, username, avatar }: SignUpApiData) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const userProfile = { uid: user.uid, email, username, avatar };
  createUserProfile(userProfile);
  return user;
};

const createUserProfile = async (userProfile: UserProfileApiData) => {
  await setDoc(doc(db, 'profiles', userProfile.uid), userProfile);
};
