import { useUser } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {};

function alumni({}: Props) {
  const { currentUser, isAuthLoading } = useUser();
  const router = useRouter();
  if (isAuthLoading) {
    return <>Loading...</>;
  }
  if (!currentUser && !isAuthLoading) {
    return (
      <div id="become-alumni">
        <Heading>You need to be logged in to apply to become alumni</Heading>
      </div>
    );
  }
  const [name, setName] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [enroll, setEnroll] = useState("");
  const [passout, setPassout] = useState("");
  const [alreadyAlumni, setAlreadyAlumni] = useState(false);

  useEffect(() => {
    async function getData() {
      //@ts-ignore
      const uniRef = doc(db, "university", router.query.uniId);
      const uniDoc = await getDoc(uniRef);
      if (
        uniDoc.data().alumni &&
        (uniDoc.data().alumni as Array<string>).includes(currentUser.uid)
      ) {
        setAlreadyAlumni(true);
      }
    }
    getData();
  }, []);

  async function applyClickHandler() {
    //@ts-ignore
    const alumniApplicationRef = doc(db, "university", router.query.uniId);
    const alumniApplicationDoc = await updateDoc(alumniApplicationRef, {
      alumni: arrayUnion(currentUser.uid),
    });
    router.replace(`/university/${router.query.uniId}/`);
  }

  return (
    <div>
      {!alreadyAlumni ? (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
          id="become-alumni"
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Become Alumni
              </Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="enroll" isRequired>
                  <FormLabel>Enrollment number</FormLabel>
                  <Input
                    type="number"
                    value={enroll}
                    onChange={(e) => {
                      setEnroll(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="passoutyear" isRequired>
                  <FormLabel>Passout Year</FormLabel>
                  <Input
                    type="number"
                    value={passout}
                    onChange={(e) => {
                      setPassout(e.target.value);
                    }}
                  />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    onClick={applyClickHandler}
                  >
                    Apply
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      ) : (
        <div id="become-alumni">
          <Heading>You are already an alumni</Heading>
        </div>
      )}
    </div>
  );
}

export default alumni;
