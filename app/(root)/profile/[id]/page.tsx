import MasonryLayout from "@/components/Masonry";
import { getPinByUserId } from "@/lib/mongodb/actions/pin.actions";
import { getUserById } from "@/lib/mongodb/actions/user.actions";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async ({ params: { id } }: Props) => {
  const user = await getUserById(id);

  const pins = await getPinByUserId(id);

  return (
    <>
      <div className="mt-6 grid place-items-center gap-3">
        <Image
          src={user?.photo}
          alt="profile-photo"
          width={170}
          height={170}
          className="rounded-full object-center"
        />
        <span className="text-center text-4xl font-medium">
          {user?.username}
        </span>
        <h2 className="text-xs font-medium">@{user?.username}</h2>
        <h2 className="text-xl font-medium">Created</h2>
      </div>

      {pins?.length > 0 ? (
        <div className="container mx-auto mt-5">
          <MasonryLayout pins={pins} />
        </div>
      ) : (
        <h2 className="grid place-content-center text-xl text-gray-500 min-h-screen">
          this use don't create any pin yet
        </h2>
      )}
    </>
  );
};

export default ProfilePage;
