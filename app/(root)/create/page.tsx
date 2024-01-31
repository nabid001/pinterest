import PinForm from "@/components/PinForm";
import UploadPhoto from "@/components/UploadPhoto";
import { auth } from "@clerk/nextjs";

const Create = async () => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;

  return (
    <div className="container mx-auto mt-10 max-w-5xl">
      <div className="grid grid-cols-1 gap-4 rounded-lg py-5 shadow-md sm:grid-cols-[35%,1fr] sm:gap-3">
        <PinForm author={userId} />
      </div>
    </div>
  );
};

export default Create;
