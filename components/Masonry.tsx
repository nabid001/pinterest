"use client";

import { data } from "@/data";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

const breakpoints = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }: any) => {
  return (
    <div className="">
      <Masonry
        className="flex gap-2 "
        breakpointCols={breakpoints}
        columnClassName="flex flex-col gap-2"
      >
        {data?.map((pins) => (
          <Pin key={pins.id} pins={pins} className="w-max" />
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryLayout;

{
  /* <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
  <Masonry gutter="6px">
    <div className=""></div>
    <Image
      src="/0.jpg"
      width={250}
      height={250}
      alt="img"
      className="rounded-full w-max"
    />
    <Image src="/00.jpg" width={250} height={250} alt="img" />
    <Image src="/1.jpg" width={250} height={250} alt="img" />
    <Image src="/2.jpg" width={250} height={250} alt="img" />
    <Image src="/3.jpg" width={250} height={250} alt="img" />
    <Image src="/01.jpg" width={250} height={250} alt="img" />
    <Image src="/02.jpg" width={250} height={250} alt="img" />
  </Masonry>
</ResponsiveMasonry> */
}
