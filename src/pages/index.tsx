import SayHi from "@/lib/components/SayHi";
import { auth } from "@/lib/firebase";
import { Button } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export default function Home() {
  const loginClickHandler = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
  };
  const logOutClickHandler = async () => {
    await signOut(auth);
  };
  return <></>;
}
