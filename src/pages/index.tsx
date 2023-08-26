import { db } from "@/lib/firebase";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Card,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { uniDetailsTemp } from "./university/[uniId]/details";
import Link from "next/link";

type Props = {
  universities: Array<typeof uniDetailsTemp> & { id: string };
};

export default function Home({ universities }: Props) {
  return (
    <>
      <Stack w="70%" mx="auto">
        <InputGroup mt={5}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder="Search Universities (TODO)" />
        </InputGroup>
        {universities.map((uni, i) => {
          return (
            <>
              <Link href={`/university/${uni.id}`}>
                <Card variant="elevated" p={3}>
                  <HStack>
                    <Image src={uni.logoUrl} w={100}></Image>

                    <Heading size="md">{uni.name}</Heading>
                  </HStack>
                </Card>
              </Link>
            </>
          );
        })}
      </Stack>
    </>
  );
}

export async function getServerSideProps() {
  const universities = [];
  const uniRef = collection(db, "university");
  const uniSnapshot = await getDocs(uniRef);
  uniSnapshot.forEach((doc) => {
    universities.push({ id: doc.id, ...doc.data() });
  });
  console.log(universities);
  return {
    props: {
      universities,
    },
  };
}
