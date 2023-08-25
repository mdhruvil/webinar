import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

type Props = {};

export default function SayHi({}: Props) {
  const user = useContext(AuthContext);
  return (
    <div>
      {user.isAuthLoading && <>Loading...</>}
      {user.currentUser ? <>You are logged in</> : <>You are logged out</>}
    </div>
  );
}
