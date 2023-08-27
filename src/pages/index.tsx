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
import Link from "next/link";
import React from "react";
import { uniDetailsTemp } from "./university/[uniId]/details";

type Props = {
  universities: Array<typeof uniDetailsTemp & { id: string }>;
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
            <React.Fragment key={uni.id}>
              <Link href={`/university/${uni.id}`}>
                <Card variant="elevated" p={3}>
                  <HStack>
                    <Image src={uni.logoUrl} w={100}></Image>
                    <Heading size="md">{uni.name}</Heading>
                  </HStack>
                </Card>
              </Link>
            </React.Fragment>
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

  return {
    redirect: {
      destination: "/university/XyQtGnpPCeOjKM7x9xnJ",
      permanent: false,
    },
  };
  return {
    props: {
      universities,
    },
  };
}
