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
import React from "react";
import { MdCalendarMonth } from "react-icons/md";
import { useUser } from "../AuthContext";
import { useRouter } from "next/router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";

type Props = {
  upComingWebinars: UpcomingEvent[];
};

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

function UpcomingEvents({ upComingWebinars }: Props) {
  return (
    <Stack spacing={3}>
      {upComingWebinars.map((webinar, i) => {
        return (
          <React.Fragment key={i}>
            <UpComingWebinar eventData={webinar}></UpComingWebinar>
          </React.Fragment>
        );
      })}
    </Stack>
  );
}

export default UpcomingEvents;

type UpComingWebinarProps = {
  eventData: UpcomingEvent;
};

function UpComingWebinar({ eventData }: UpComingWebinarProps) {
  const {
    title,
    desc,
    shedule,
    creator,
    id,
    registeredStudentsIds,
    isStarted,
  } = eventData;
  const router = useRouter();
  const { currentUser, isAuthLoading } = useUser();
  const sheduleDate = new Date(shedule);

  const isRegistered =
    registeredStudentsIds !== undefined
      ? registeredStudentsIds.includes(currentUser?.uid)
      : false;

  async function registerClickHandle() {
    if (!currentUser) {
      return alert("You need to be logged in to register");
    }
    //@ts-ignore
    const webinarRef = doc(db, "university", router.query.uniId, "webinar", id);
    await updateDoc(webinarRef, {
      registeredStudentsIds: arrayUnion(currentUser.uid),
    });
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
              {isRegistered ? (
                isStarted ? (
                  <Link
                    href={`/university/${router.query.uniId}/webinar/${id}`}
                  >
                    <Button colorScheme="green">Join</Button>
                  </Link>
                ) : (
                  <Text>Registered</Text>
                )
              ) : (
                <Button
                  colorScheme="blue"
                  onClick={registerClickHandle}
                  isDisabled={isStarted}
                >
                  Register
                </Button>
              )}
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
