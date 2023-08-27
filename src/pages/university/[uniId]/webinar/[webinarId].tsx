import { useUser } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  webinarData: UpcomingEvent;
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

function Webinar({ webinarData }: Props) {
  const { registeredStudentsIds, title } = webinarData;
  const router = useRouter();
  const { currentUser, isAuthLoading } = useUser();
  const isRegistered =
    registeredStudentsIds !== undefined
      ? registeredStudentsIds.includes(currentUser?.uid)
      : false;

  if (!isRegistered) {
    return <>You are not registered in this webinar</>;
  }
  return (
    <div>
      {router.isReady && (
        <JitsiMeeting
          roomName={title}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
            buttonsWithNotifyClick: [
              {
                key: "end-meeting",
                preventExecution: true,
              },
            ],
          }}
          interfaceConfigOverwrite={{
            SHOW_CHROME_EXTENSION_BANNER: false,
          }}
          userInfo={{
            displayName: currentUser?.displayName || "",
            email: currentUser?.email || "",
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "100vh";
          }}
          onReadyToClose={() => {
            router.replace(`/university/${router.query.uniId}`);
          }}
        ></JitsiMeeting>
      )}
    </div>
  );
}

export default Webinar;

export async function getServerSideProps({ params }) {
  const webinarRef = doc(
    db,
    "university",
    params.uniId,
    "webinar",
    params.webinarId
  );
  const webinarSnap = await getDoc(webinarRef);

  return {
    props: {
      webinarData: webinarSnap.data(),
    },
  };
}
