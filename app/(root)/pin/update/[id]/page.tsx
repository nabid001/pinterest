import PinForm from "@/components/PinForm";
import { getPinById } from "@/lib/mongodb/actions/pin.actions";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const PinUpdate = async ({ params: { id } }: Props) => {
  const user = await currentUser();

  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  if (!user) {
    redirect("/login");
  }

  const pin = await getPinById(id);

  return (
    <div className="container mx-auto mt-10 max-w-5xl">
      <div className="grid grid-cols-1 gap-4 rounded-lg py-5 shadow-md sm:grid-cols-[35%,1fr] sm:gap-3">
        <PinForm type="Update" author={userId} pin={pin} pinId={pin?._id} />
      </div>
    </div>
  );
};

export default PinUpdate;
