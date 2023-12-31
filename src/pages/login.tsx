import GoogleLogo from "@/lib/components/GoogleLogo";
import { auth, db } from "@/lib/firebase";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function login() {
  const router = useRouter();
  async function logInClickHandler() {
    const googleProvider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      const userSnap = await getDoc(doc(db, "user", user.uid));
      if (!userSnap.exists()) {
        await setDoc(doc(db, "user", user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          alumniOf: [],
        });
      }
      await router.replace("/university/XyQtGnpPCeOjKM7x9xnJ");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Log In
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Login to edusakha
        </Text>
        <Stack spacing={6}>
          <Button onClick={logInClickHandler}>
            <GoogleLogo /> &nbsp; Login with Google
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
