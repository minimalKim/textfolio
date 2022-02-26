import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { Block } from '../../components/EditableBlock';
import { db } from '../../db/firestore';
import { makeId } from '../../utils';

type UpdateUserDocsApiData = {
  uid: string;
  userBlocks: { [key in string]: Block[] };
};

export const getUserDocs = async (uid: string) => {
  const docRef = doc(db, 'docs', uid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const updateUserDoc = ({ uid, userBlocks }: UpdateUserDocsApiData) => {
  const docRef = doc(db, 'docs', uid);
  updateDoc(docRef, userBlocks);
};

export const createUserDoc = async (uid: string) => {
  const docRef = doc(db, 'docs', uid);
  const newDocId = `doc-${makeId()}`;
  const initialBlocks = [{ id: makeId(), html: '', tag: 'h2', isFocus: true }];
  await updateDoc(docRef, { [newDocId]: initialBlocks });
  return newDocId;
};
