import { useUser } from "@/lib/AuthContext";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

function Webinar({}: Props) {
  const router = useRouter();
  const { currentUser, isAuthLoading } = useUser();
  return (
    <div>
      {router.isReady && (
        <JitsiMeeting
          roomName={`webinar-${router.query.webinarId}`}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
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
        ></JitsiMeeting>
      )}
    </div>
  );
}

export default Webinar;
