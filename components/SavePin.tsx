"use client";

import { createSavePin } from "@/lib/mongodb/actions/user.actions";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

type Props = {
  pinId: string;
  author: string;
  savePins: [
    {
      author: string;
    }
  ];
};

const SavePin = ({ pinId, author, savePins }: Props) => {
  const path = usePathname();

  const handleSave = async () => {
    await createSavePin({
      pinId,
      author,
      path,
    });
  };

  return (
    <Button onClick={() => handleSave()} variant="default" className="ml-auto">
      Save
    </Button>
  );
};

export default SavePin;
