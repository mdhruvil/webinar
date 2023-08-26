import UpcomingEvents from "@/lib/components/UpcomingEvents";
import { db } from "@/lib/firebase";
import {
  Button,
  HStack,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";

type Props = {
  upComingWebinars: typeof upComingWebinarsTemp;
  uniDetails: any;
};

const upComingWebinarsTemp = [
  {
    title: "Guide session",
    shedule: 1693027985853,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quaerat dolorem officia. Quidem cumque veniam, officia enim fugiat laborum nisi quasi aspernatur ut laboriosam. Tempore labore aliquam tenetur fuga pariatur!",
    registeredStudents: 69,
    creator: {
      displayName: "Dhruvil The Jod",
      photoURL: "https://github.com/mdhruvil.png",
    },
  },
  {
    title: "Cantine Session",
    shedule: 1693027985853 + 100000000,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quaerat dolorem officia. Quidem cumque veniam, officia enim fugiat laborum nisi quasi aspernatur ut laboriosam. Tempore labore aliquam tenetur fuga pariatur!",
    registeredStudents: 69,
    creator: {
      displayName: "OG The Jod",
      photoURL: "https://github.com/mdhruvil.png",
    },
  },
];

function University({ upComingWebinars, uniDetails }: Props) {
  return (
    <>
      <Stack w="80%" mx="auto" mt={10}>
        <HStack>
          <Heading>{uniDetails.name}</Heading>
          <Link href={`/${location.pathname}/details`}>
            <Button>More Details</Button>
          </Link>
        </HStack>
        <Tabs isFitted variant="soft-rounded" mt={2}>
          <TabList mb="1em">
            <Tab>Upcoming Events</Tab>
            <Tab>Previous Events</Tab>
            <Tab>Questions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UpcomingEvents
                upComingWebinars={upComingWebinars}
              ></UpcomingEvents>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>Questions</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </>
  );
}

export default University;

export const getServerSideProps = async ({ params }) => {
  const webinars = [];
  const webinarsRef = collection(db, "university", params.uniId, "webinar");
  const webinarsSnapShot = await getDocs(webinarsRef);
  webinarsSnapShot.forEach((doc) => {
    webinars.push({ id: doc.id, ...doc.data() });
  });
  const uniRef = doc(db, "university", params.uniId);
  const uniDoc = await getDoc(uniRef);
  return {
    props: {
      upComingWebinars: webinars,
      uniDetails: uniDoc.data(),
    },
  };
};
