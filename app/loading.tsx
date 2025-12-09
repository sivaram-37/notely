"use client";

import { NotelyLoader } from "@/components/common/notely-loader";

const Loading = () => {
  return (
    <div className="h-dvh flex justify-center items-center">
      <NotelyLoader />
    </div>
  );
};

export default Loading;
