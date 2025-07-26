import { Avatar, AvatarFallback, AvatarImage } from "@/components";

export const Header = () => {
  return (
    <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full">
      <div className="flex w-[85%] m-auto justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <Avatar>
            <AvatarImage
              className="w-10 h-10 "
              src="https://github.com/shadcn.png"
              alt="Avatar"
            />
            <AvatarFallback>I</AvatarFallback>
          </Avatar>
          <h2 className="text-white text-xl font-semibold font-['Inter']">
            Brooklyn Simmons
          </h2>
        </div>
      </div>
    </div>
  );
};
