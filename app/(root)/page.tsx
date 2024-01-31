import MasonryLayout from "@/components/Masonry";
import { getPins } from "@/lib/mongodb/actions/pin.actions";

export default async function Home() {
  const pins = await getPins();
  return (
    <div className="container mx-auto mt-5 px-2">
      {pins && <MasonryLayout pins={pins} />}
    </div>
  );
}
