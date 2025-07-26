import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "@/icons";
export const ProfileTop = () => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.warn(file);
  };

  return (
    <div className="border-b-2 border-[#FFCC15] pb-6 rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full">
      <div className="flex w-[95%] m-auto gap-x-5 items-center">
        <div className="relative">
          <Avatar className="w-[116px] h-[116px]">
            <AvatarImage
              className="w-[116px] h-[116px]"
              src="https://github.com/shadcn.png"
              alt="Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 right-1 !h-9 !w-9">
            <>
              <Label htmlFor="picture" className="w-full">
                <Camera className="!h-9 !w-9" />
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          </div>
        </div>
        <h5 className="text-center text-white text-2xl font-semibold leading-[31.20px]">
          Profile
        </h5>
      </div>
    </div>
  );
};
