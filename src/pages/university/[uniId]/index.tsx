import { useUser } from "@/lib/AuthContext";
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
  VStack,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  upComingWebinars: typeof upComingWebinarsTemp;
  uniDetails: any;
};

//temporary data but now used for types
const upComingWebinarsTemp = [
  {
    id: "id",
    title: "Guide session",
    shedule: 1693027985853,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quaerat dolorem officia. Quidem cumque veniam, officia enim fugiat laborum nisi quasi aspernatur ut laboriosam. Tempore labore aliquam tenetur fuga pariatur!",
    registeredStudents: 69,
    creator: {
      uid: "hh",
      displayName: "Dhruvil The Jod",
      photoURL: "https://github.com/mdhruvil.png",
    },
    isStarted: false,
    registeredStudentsIds: [],
  },
  {
    id: "id",
    title: "Cantine Session",
    shedule: 1693027985853 + 100000000,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quaerat dolorem officia. Quidem cumque veniam, officia enim fugiat laborum nisi quasi aspernatur ut laboriosam. Tempore labore aliquam tenetur fuga pariatur!",
    registeredStudents: 69,
    creator: {
      uid: "h",
      displayName: "OG The Jod",
      photoURL: "https://github.com/mdhruvil.png",
    },
    isStarted: false,
    registeredStudentsIds: [],
  },
];

function University({ upComingWebinars, uniDetails }: Props) {
  const { currentUser, isAuthLoading } = useUser();
  const router = useRouter();
  return (
    <>
      <Stack w="80%" mx="auto" mt={10}>
        {!isAuthLoading && !currentUser && (
          <>
            You are not logged in{" "}
            <Link href={"/login"}>Click here to log in</Link>
          </>
        )}
        <HStack>
          <Heading>{uniDetails.name}</Heading>
          <VStack>
            <Link href={`/university/${router.query.uniId}/details`}>
              <Button>More Details </Button>
            </Link>
            <Link href={`/university/${router.query.uniId}/alumni`}>
              <Button>Become Alumni</Button>
            </Link>
          </VStack>
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
  const webinarQuery = query(webinarsRef, orderBy("shedule"));
  const webinarsSnapShot = await getDocs(webinarQuery);
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
