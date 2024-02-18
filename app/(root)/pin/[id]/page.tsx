import CommentForm from "@/components/forms/CommentForm";
import { Button } from "@/components/ui/button";
import { getCommentById } from "@/lib/mongodb/actions/comment.actions";
import {
  getPinById,
  getPins,
  getRelatedPin,
} from "@/lib/mongodb/actions/pin.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

import { MdOutlineMoreHoriz } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PinShare from "@/components/PinShare";
import MasonryLayout from "@/components/Masonry";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: PageProps) => {
  const pin = await getPinById(id);
  const pinId = pin?._id;
  const pins = await getRelatedPin(pinId);

  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  const comment = await getCommentById(id);

  const deleteCheck = userId === pin?.author?._id;

  return (
    <>
      <div className="container grid overflow-auto h-auto place-items-center">
        <div className="grid grid-cols-1  shadow-lg sm:grid-cols-2 sm:rounded-2xl md:mt-10">
          <div className="">
            <img src={pin?.image} alt="pin-image" className="object-cover" />
          </div>

          <div className="mt-5 flex flex-col gap-14 px-4 sm:mt-5 sm:gap-10">
            <div className="flex items-center gap-3">
              <PinShare pinTitle={pin?.title} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <MdOutlineMoreHoriz className="text-3xl" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <a
                        href={pin?.image}
                        className=""
                        download={pin?.title}
                        target="_blank"
                      >
                        Download
                      </a>
                    </DropdownMenuItem>
                    {deleteCheck && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href={`/pin/update/${pin?._id}`}>Edit</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* {beforeSave && (
              <SavePin pinId={pin?._id} savePins={savePins} author={userId} />
            )} */}
            </div>

            <div className="flex flex-col gap-5">
              <span className="text-2xl font-bold">{pin?.title}</span>
              <span className="text-base">{pin?.description}</span>
              <Link href={`${pin?.link}`} className="text-base">
                {pin?.link}
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <Link href={`/profile/${pin?.author?._id}`}>
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={pin?.author?.photo}
                    className="h-[45px] w-[45px] rounded-full object-cover"
                    alt="user-image"
                  />
                  <div className="flex flex-col">
                    <span className="cursor-pointer font-medium text-black transition-colors hover:text-slate-800 hover:underline">
                      {pin?.author?.username}
                    </span>
                    {/* <span className="text-sm">993 followers</span> */}
                  </div>
                </div>
              </Link>

              {/* <span className="rounded-full bg-slate-200 px-3 py-2 text-left">
              Follow
            </span> */}
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium">Comments</span>

              <CommentForm
                author={userId}
                pinId={pin?._id}
                comment={comment && comment}
              />
            </div>
          </div>
        </div>
      </div>

      <span className="mt-5 text-lg  text-gray-600 grid place-items-center">
        More to explore
      </span>

      {pins?.length > 0 ? (
        <div className="mt-7 container mx-auto">
          <MasonryLayout pins={pins} />
        </div>
      ) : (
        <h2 className=" mt-3 text-gray-500 text-center">no pins yet!</h2>
      )}
    </>
  );
};

export default page;
