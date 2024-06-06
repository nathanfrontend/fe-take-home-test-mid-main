const NoData = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-24">
      <img
        loading="lazy"
        src="/no-data.svg"
        className="h-[200px] w-[200px]"
        alt="no data"
      />

      <h2 className="text-2xl">No Posts Yet, try refresh</h2>
    </div>
  );
};

export default NoData;
