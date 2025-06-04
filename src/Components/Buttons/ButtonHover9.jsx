const ButtonHover9 = () => {
  return (
    <>
      <button className="group relative inline-flex h-10 items-center justify-center cursor-pointer overflow-hidden rounded-md border-2 border-[#dec96a] font-medium">
  <div className="inline-flex h-12 translate-y-0 items-center justify-center px-6 bg-gradient-to-r from-[#fff58f] to-[#dec96a] text-black transition duration-500 group-hover:-translate-y-[150%]">
    Register
  </div>
  <div className="absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center text-black transition duration-500 group-hover:translate-y-0">
    <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-[#dec96a] transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
    <span className="z-10">Register</span>
  </div>
</button>

    </>
  );
};
export default ButtonHover9;