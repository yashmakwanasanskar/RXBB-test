const CapsuleLable = ({ text, className }: any) => {
  return (
    <div
      className={` bg-[#F0F0F0] rounded-xl w-fit px-2 py-1 text-left content-center  ${className}`}
    >
      <p className="font-semibold text-[#474747] text-xs">{text}</p>
    </div>
  );
};

export default CapsuleLable;
