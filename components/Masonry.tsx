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
  500: 2,
};

const MasonryLayout = ({ pins }: any) => {
  return (
    <div className="">
      <Masonry
        className="flex gap-2 "
        breakpointCols={breakpoints}
        columnClassName="flex flex-col gap-2"
      >
        {pins?.map((pin: any) => (
          <Pin key={pin._id} pin={pin} className="w-max" />
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryLayout;
