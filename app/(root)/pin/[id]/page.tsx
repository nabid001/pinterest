import DeletePin from "@/components/DeletePin";
import { getPinById } from "@/lib/mongodb/actions/pin.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: PageProps) => {
  const pin = await getPinById(id);
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  let deleteCheck = userId === pin?.author._id;

  return (
    <div className="container grid overflow-auto min-h-screen place-items-center">
      <div className="grid grid-cols-1  shadow-lg sm:grid-cols-2 sm:rounded-2xl md:mt-10">
        <div className="">
          <img src={pin?.image} alt="pin-image" className="object-cover" />
        </div>

        <div className="mt-5 flex flex-col gap-14 px-4 sm:mt-5 sm:gap-10">
          <div className="flex items-center justify-between gap-5">
            {deleteCheck && <DeletePin id={pin?._id} />}
            <a
              href={pin?.image}
              className="ml-auto"
              download={pin?.title}
              target="_blank"
            >
              Download
            </a>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-2xl font-bold">{pin?.title}</span>
            <span className="text-base">{pin?.description}</span>
          </div>

          <div className="flex items-center justify-between">
            <Link href={`/profile/${pin?.author?.username}`}>
              <div className="flex items-center justify-center gap-2">
                <img
                  src={pin?.author?.photo}
                  className="h-[45px] w-[45px] rounded-full object-cover"
                  alt="user-image"
                />
                <div className="flex flex-col">
                  <span className="text-sm">{pin?.author?.username}</span>
                  {/* <span className="text-sm">993 followers</span> */}
                </div>
              </div>
            </Link>

            <span className="rounded-full bg-slate-200 px-3 py-2 text-left">
              Follow
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="disabled:">Comments</span>
            <span className="text-gray-500">No comments yet!</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <span className="text-lg font-medium">More to explore</span>

        {/* messonary layout */}
      </div>
    </div>
  );
};

export default page;
