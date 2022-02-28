import {
  createUserWithEmailAndPassword,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

const createUserProfile = (userProfile: UserProfileApiData) => {
  const docRef = doc(db, 'profiles', userProfile.uid);
  return setDoc(docRef, userProfile);
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

export const signOut = () => signOutFirebase(auth);

export const getUserProfile = (uid: string) => {
  const docRef = doc(db, 'profiles', uid);
  return getDoc(docRef).then((snapshot) => snapshot.data());
};

export const onAuthStateChanges = (onAuth: NextOrObserver<User>) => onAuthStateChanged(auth, onAuth);
