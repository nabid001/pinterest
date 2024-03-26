import MasonryLayout from "@/components/Masonry";
import { getPins } from "@/lib/mongodb/actions/pin.actions";

export default async function Home() {
  const pins = await getPins();
  return (
    <div className="container mx-auto mt-5 px-2">
      {pins?.length > 0 ? (
        <>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <h1 className="grid place-content-center text-lg text-gray-500 min-h-screen">
          no pins yet
        </h1>
      )}
    </div>
  );
}
