"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

const UploadPhoto = ({ photo, setPhoto }: { photo: string; setPhoto: any }) => {
  return (
    <>
      {photo ? (
        <>
          <Image src={photo} width={300} height={340} alt="image" />
        </>
      ) : (
        <CldUploadButton
          options={{ sources: ["local"] }}
          uploadPreset="pinboard"
          onUpload={(results: any): void => {
            setPhoto(results.info.secure_url);
          }}
        />
      )}

      {photo && (
        <Button className="mt-20" onClick={() => setPhoto("")} variant="ghost">
          Remove image
        </Button>
      )}
    </>
  );
};

export default UploadPhoto;
