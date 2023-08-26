import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Divider, Heading, Image, Link, Stack, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

type Props = {};

const uniDetails = {
  name: "L.D. College of Engeenering",
  logoUrl: "https://www.daiict.ac.in/themes/daiict/images/logo-new.png",
  address:
    "Opp Gujarat University, Navrangpura, Ahmedabad - 380015. GUJARAT INDIA",
  website: "https://ldce.ac.in/",
  phoneNo: "9999999999",
  email: "dhruvil1808@gmail.com",
  broshure: "https://www.google.com",
  images: [
    "https://ldce.ac.in/images/thumb/achievements/2022/ldce-received-second-time-highest-rating-of-5-stars-at-gujarat-state-institutional-ranking-framework-2022.jpg",
    "https://ldce.ac.in/images/thumb/achievements/2023/list-of-awards-in-last-5-years.jpg",
    "https://ldce.ac.in/images/thumb/achievements/2023/ldce-is-delighted-to-share-that-nba-has-accredited-computer-engineering-and-rubber-technology-undergraduate-program-for-three-years-upto-june-2026.jpeg",
  ],
};

function details({}: Props) {
  return (
    <Stack spacing={2} m={10}>
      <Stack spacing={5} isInline alignItems="center">
        <Image w={100} h={100} src={uniDetails.logoUrl} />
        <Stack spacing={2}>
          <Heading>L.D. College of Engeenering</Heading>
          <Link isExternal href={uniDetails.website}>
            {uniDetails.website}
          </Link>
        </Stack>
      </Stack>
      <Divider borderColor="blackAlpha.500" />
      <Stack spacing={2} isInline alignItems="center">
        <Text fontSize="lg">Address : </Text>
        <Text textAlign="left" fontSize="lg">
          {uniDetails.address}
        </Text>
      </Stack>
      <Divider borderColor="blackAlpha.500" />

      <Stack spacing={5} isInline>
        <Link href={uniDetails.broshure} isExternal color="blue.500">
          Broshure <ExternalLinkIcon mx="2px" />
        </Link>
        <Divider
          borderColor="blackAlpha.500"
          orientation="vertical"
          height="30px"
        />

        <Link color="blue.500" href={`tel:${uniDetails.phoneNo}`}>
          Phone <ExternalLinkIcon mx="2px" />
        </Link>
        <Divider
          borderColor="blackAlpha.500"
          orientation="vertical"
          height="30px"
        />
        <Link color="blue.500" href={`maito:${uniDetails.email}`}>
          Email <ExternalLinkIcon mx="2px" />
        </Link>
      </Stack>
      <Carousel width="50%">
        {uniDetails.images.map((image, i) => {
          return (
            <div key={image}>
              <img src={image} alt={image} />
            </div>
          );
        })}
      </Carousel>
    </Stack>
  );
}

export default details;
