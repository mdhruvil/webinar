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
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {};

function createWebinar({}: Props) {
  const { currentUser, isAuthLoading } = useUser();
  const router = useRouter();
  if (isAuthLoading) {
    return <>Loading...</>;
  }
  if (!currentUser && !isAuthLoading) {
    return <>You need to be logged in to apply to become alumni</>;
  }

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [isAlumni, setIsAlumni] = useState(false);

  useEffect(() => {
    async function getData() {
      //@ts-ignore
      const uniRef = doc(db, "university", router.query.uniId);
      const uniDoc = await getDoc(uniRef);
      if (
        uniDoc.data().alumni &&
        (uniDoc.data().alumni as Array<string>).includes(currentUser.uid)
      ) {
        setIsAlumni(true);
      }
    }
    getData();
  }, []);

  async function createWebinarClickHandler() {
    const date = new Date(dateTime);
    const data = {
      title: name,
      desc,
      shedule: date.getTime(),
      creator: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      isStarted: false,
      registeredStudentsIds: [currentUser.uid],
    };
    await addDoc(
      //@ts-ignore
      collection(db, "university", router.query.uniId, "webinar"),
      data
    );
    router.replace(`/university/${router.query.uniId}`);
  }

  return (
    <div>
      {isAlumni ? (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Create A Webinar
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
                  <FormLabel>Webinar Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="discription" isRequired>
                  <FormLabel>Discription</FormLabel>
                  <Textarea
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  />
                </FormControl>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => {
                    setDateTime(e.target.value);
                    console.log(e.target.value);
                  }}
                />
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    onClick={createWebinarClickHandler}
                  >
                    Create
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      ) : (
        <Heading>You need to be alumni to create webinars</Heading>
      )}
    </div>
  );
}

export default createWebinar;
