import MasonryLayout from "@/components/Masonry";
import { data } from "@/data";

export default function Home() {
  return (
    <div className="container mx-auto mt-5 px-2">
      {data && <MasonryLayout pins={data} />}
    </div>
  );
}
