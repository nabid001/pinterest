import Image from "next/image";
import Link from "next/link";
import React from "react";

const Pin = ({ pin }: any) => {
  return (
    <>
      <Link href={`/pin/${pin?._id}`}>
        <Image
          className="rounded-lg w-full"
          src={pin?.image}
          width={250}
          height={250}
          alt="img"
        />
      </Link>
    </>
  );
};

export default Pin;
