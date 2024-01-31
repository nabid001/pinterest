import React from "react";

const PinForm2 = () => {
  return (
    <>
      <div className="grid place-items-center">
        <div className="h-[380px] w-[300px] overflow-auto rounded-lg bg-gray-400">
          <img
            src="https://i.pinimg.com/564x/61/f5/04/61f504c6a70aa4ddc4cb7b89e668dea9.jpg"
            alt="uploaded-photo"
            className="rounded-lg object-cover"
          />
        </div>
        <span className="mt-3 cursor-pointer rounded-lg bg-slate-300 px-2 py-1 text-base text-gray-500 transition-colors hover:text-gray-600">
          Remove image
        </span>
      </div>
      <div className="px-4 sm:px-0">
        <form action="#" method="post" className="px-3 py-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
              className="mt-1 w-full rounded-md border p-2 focus:outline-slate-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              rows={3}
              className="mt-1 w-full rounded-md border p-2 focus:outline-slate-200"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600">
              Link
            </label>
            <input
              type="text"
              id="link"
              name="link"
              placeholder="Enter link"
              className="mt-1 w-full rounded-md border p-2 focus:outline-gray-200"
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-gray-500 p-2 text-slate-200 transition-colors hover:bg-gray-600"
          >
            Create Pin
          </button>
        </form>
      </div>
    </>
  );
};

export default PinForm2;
