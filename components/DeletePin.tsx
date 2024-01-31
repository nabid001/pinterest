"use client";

import { deletePinByUserId } from "@/lib/mongodb/actions/pin.actions";
import { useRouter } from "next/navigation";

const DeletePin = ({ id }: { id: string }) => {
  const router = useRouter();

  const deletePin = async () => {
    await deletePinByUserId(id);

    router.push("/");
  };

  return (
    <>
      <button onClick={() => deletePin()}>Delete</button>
    </>
  );
};

export default DeletePin;
