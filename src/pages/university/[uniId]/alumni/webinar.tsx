import {
  Avatar,
  Badge,
  Button,
  Card,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdCalendarMonth } from "react-icons/md";
import { useUser } from "@/lib/AuthContext";
import { useRouter } from "next/router";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Props = {};

type UpcomingEvent = {
  id: string;
  title: string;
  desc: string;
  shedule: number;
  registeredStudents: number;
  creator: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  isStarted: boolean;
  registeredStudentsIds: string[];
};

function webinars({}: Props) {
  const { currentUser, isAuthLoading } = useUser();
  const router = useRouter();
  if (isAuthLoading) {
    return <>Loading...</>;
  }
  if (!currentUser && !isAuthLoading) {
    return <>You need to be logged in to Start the webinar</>;
  }
  const [upComingWebinars, setupComingWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const webinarsTemp = [];
    async function getData() {
      //@ts-ignore
      const webinarRef = collection(
        db,
        "university",
        router.query.uniId,
        "webinar"
      );
      const q = query(webinarRef, where("creator.uid", "==", currentUser.uid));
      const webinarsSnapShot = await getDocs(q);
      webinarsSnapShot.forEach((doc) => {
        // setupComingWebinars([
        //   ...upComingWebinars,
        //   { id: doc.id, ...doc.data() },
        // ]);
        webinarsTemp.push({ id: doc.id, ...doc.data() });
      });
    }
    getData().then(() => {
      setupComingWebinars(webinarsTemp);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Stack w={"70%"} spacing={3} mx={"auto"} mt={3}>
        <Heading>Webinars created by you</Heading>
        {loading && <>Loading pls</>}
        {upComingWebinars.map((webinar, i) => {
          return (
            <React.Fragment key={i}>
              <Webinar eventData={webinar}></Webinar>
            </React.Fragment>
          );
        })}
      </Stack>
    </>
  );
}

export default webinars;

type WebinarProps = {
  eventData: UpcomingEvent;
};

function Webinar({ eventData }: WebinarProps) {
  const router = useRouter();
  const {
    title,
    desc,
    shedule,
    creator,
    id,
    registeredStudentsIds,
    isStarted,
  } = eventData;

  const sheduleDate = new Date(shedule);

  async function startWebinarClickHander() {
    //@ts-ignore
    const docRef = doc(db, "university", router.query.uniId, "webinar", id);
    await updateDoc(docRef, {
      isStarted: true,
    });
    router.replace(`/university/${router.query.uniId}/webinar/${id}`);
  }

  return (
    <>
      <Card variant="filled" p={4}>
        <HStack>
          <VStack align="flex-start">
            <Heading size="lg">{title}</Heading>
            <Text>{desc}</Text>
            <HStack>
              <Icon as={MdCalendarMonth} boxSize={5}></Icon>
              <Text>
                {sheduleDate.getDate()}/{sheduleDate.getMonth()}/
                {sheduleDate.getFullYear()}-{" "}
                {sheduleDate.toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {isStarted && <Badge colorScheme="red">Live</Badge>}
              </Text>
            </HStack>
            <HStack>
              <Avatar src={creator.photoURL} size="sm"></Avatar>
              <Text fontSize="md">{creator.displayName}</Text>
            </HStack>
            <HStack>
              <Button colorScheme="blue" onClick={startWebinarClickHander}>
                Start Webinar
              </Button>

              <Badge colorScheme="green">
                {registeredStudentsIds.length} Registered
              </Badge>
            </HStack>
          </VStack>
        </HStack>
      </Card>
    </>
  );
}
