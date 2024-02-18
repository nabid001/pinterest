"use client";

import { deletePin } from "@/lib/mongodb/actions/pin.actions";
import { useRouter } from "next/navigation";

const DeletePin = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDeletePin = async () => {
    await deletePin(id);
    router.push("/");
  };

  return (
    <>
      <button onClick={() => handleDeletePin()}>Delete</button>
    </>
  );
};

export default DeletePin;
