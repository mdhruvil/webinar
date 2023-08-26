import {
  Avatar,
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

type Props = {
  upComingWebinars: UpcomingEvent[];
};

type UpcomingEvent = {
  title: string;
  desc: string;
  shedule: number;
  registeredStudents: number;
  creator: {
    displayName: string;
    photoURL: string;
  };
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
  const { title, desc, shedule, registeredStudents, creator } = eventData;
  const sheduleDate = new Date(shedule);
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
                {sheduleDate.getFullYear()} -{" "}
                {sheduleDate.toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </HStack>
            <HStack>
              <Avatar src={creator.photoURL} size="sm"></Avatar>
              <Text fontSize="md">{creator.displayName}</Text>
            </HStack>
          </VStack>
          <VStack>
            <Button colorScheme="blue">Register</Button>
            <Text fontSize="smaller">{registeredStudents} Registered</Text>
          </VStack>
        </HStack>
      </Card>
    </>
  );
}
