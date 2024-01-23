import Image from "next/image";
import React from "react";

const Pin = ({ pins }: any) => {
  return (
    <>
      <Image
        className="rounded-lg w-full"
        src={pins.imageLink}
        width={250}
        height={250}
        alt="img"
      />
    </>
  );
};

export default Pin;
