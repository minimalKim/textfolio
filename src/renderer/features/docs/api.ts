import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../db/firestore';

export const getUserDocs = async (uid: string) => {
  const docRef = doc(db, 'docs', uid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};
