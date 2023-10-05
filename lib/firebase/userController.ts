import { User, browserLocalPersistence, getRedirectResult, setPersistence, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, db, googleAuthProvider } from ".";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CourseWithId } from "@/hooks/useCourses";
import "@/lib/sort-courses"
import { randomUUID } from "crypto";


export const SignInWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence)
    const result = await signInWithPopup(auth, googleAuthProvider)
    const user = result.user
    await addUserToFireStore(user)
    return user
}

export const addUserToFireStore = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    // return if user already exists
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return;
    }
    // add user to firestore
    await setDoc(userRef, {
        uid: user.uid,
        lastLogin: new Date()
    }, { merge: true });
}

const dayOptions = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]

export const SyncUserRoutine = async (user: User | null, routine: {[key: string]: CourseWithId[]}) => {
    if (!user) {
        throw new Error("User is not logged in");
    }  
    let userRef = doc(db, "users", user.uid);
    if (!userRef) {
        throw new Error("User not found");
    }
    let updatedRoutine = dayOptions.map((day) => {
        if (routine[day]) {
            return {
                [day]: routine[day].sortByTime()
            }
        } else {
            return {
                [day]: []
            }
        }
    })
    console.log(updatedRoutine)
    await setDoc(userRef, {
        routine
    }, { merge: true });
}

export const GetUserRoutine = async (user: User | null) => {
    if (!user) {
        throw new Error("User is not logged in");
    }  
    return await getUserRoutineById(user.uid)
}

export const getUserRoutineById = async (uid: string) => {
    let userRef = doc(db, "users", uid);
    if (!userRef) {
        throw new Error("User not found");
    }
    let routine = await getDoc(userRef);
    if (!routine.exists()) {
        return {}
    }
    return routine.data().routine as {[key: string]: CourseWithId[]};
}

export const shareRoutine = async(user: User,routine: {[key: string]: CourseWithId[]}) => {
  const id = randomUUID()
  if (!user) {
    throw new Error("User is not logged in");
  }
  let userRef = doc(db, "routines", id);
    if (!userRef) {
        throw new Error("User not found");
    }
    await setDoc(userRef, {
        routine
    }, { merge: true });
    return id
}