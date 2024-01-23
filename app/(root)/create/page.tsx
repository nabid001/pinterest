import PinForm from "@/components/PinForm";

const Create = () => {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="grid w-[1000px] grid-cols-2 border p-10 shadow-sm">
        <div className="grid place-items-center">
          <div className="grid h-[340px] w-[300px] place-content-center rounded-lg bg-gray-200 shadow-sm">
            <h1>Upload</h1>
          </div>
        </div>

        <div className="">
          <PinForm />
        </div>
      </div>
    </div>
  );
};

export default Create;
