/* eslint-disable import/no-cycle */
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Block } from '../../components/EditableBlock';
import { db } from '../../db/firestore';
import { makeId } from '../../utils';
import { DocsType } from './slices';

type UpdateUserDocsApiData = {
  docId: string;
  blocks: Block[];
};

export const getUserDocs = async (uid: string) => {
  const q = query(collection(db, 'docs'), where('userId', '==', uid));
  const querySnapshot = await getDocs(q);
  const docs: DocsType[] = [];
  querySnapshot.forEach((doc) => {
    const { updatedAt, createdAt } = doc.data();
    const docData = {
      ...doc.data(),
      docId: doc.id,
      updatedAt: (updatedAt as Timestamp).toDate().toISOString(),
      createdAt: (createdAt as Timestamp).toDate().toISOString(),
    };
    docs.push(docData as DocsType);
  });
  return docs;
};

export const updateUserDoc = ({ docId, blocks }: UpdateUserDocsApiData) => {
  const docRef = doc(db, 'docs', docId);
  const updatedDate = new Date();
  const timeStamp = Timestamp.fromDate(updatedDate);
  updateDoc(docRef, {
    updatedAt: timeStamp,
    blocks,
  });
  return updatedDate.toISOString();
};

export const createUserDoc = async (uid: string) => {
  const newDocId = `doc${makeId()}`;
  const initialBlocks = [{ id: makeId(), html: '', tag: 'h2', isFocus: true }];
  const createdDate = new Date();
  const timeStamp = Timestamp.fromDate(createdDate);
  const docRef = doc(db, 'docs', newDocId);
  await setDoc(docRef, {
    createdAt: timeStamp,
    updatedAt: timeStamp,
    userId: uid,
    blocks: initialBlocks,
  });

  const newUserDocs = await getUserDocs(uid);
  return { newDocId, newUserDocs };
};

export const deleteUserDoc = (docId: string) => {
  const docRef = doc(db, 'docs', docId);
  deleteDoc(docRef);
  return docId;
};
