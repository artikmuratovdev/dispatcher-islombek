/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import {
  useMeQuery,
  useUbdateAvatarMutation,
  useUploadImageMutation,
} from "@/app/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useHandleRequest } from "@/hooks";
import { Camera } from "@/icons";
import toast from "react-hot-toast";

export const ProfileTop = () => {
  const { data:me, refetch } = useMeQuery();
  const handleRequest = useHandleRequest();
  const [uploadImage] = useUploadImageMutation();
  const [updateAvatar] = useUbdateAvatarMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return toast.error("Fayl tanlanmadi");

    const formData = new FormData();
    formData.append("file", file);

    console.log(file);

    await handleRequest({
      request: async () => {
        const { url } = await uploadImage(formData).unwrap();
        return await updateAvatar({ avatar: url }).unwrap();
      },
      onSuccess: () => {
        toast.success("Profil rasmi muvaffaqiyatli o’zgartirildi");
        refetch();
      },
    });
  };

  return (
    <div className="flex items-start gap-x-5">
      <div className="flex flex-col relative">
        <Avatar className="w-[95px] h-[95px]">
          <AvatarImage src={me?.avatar} alt="@shadcn" />
          <AvatarFallback>{me?.fullName?.charAt(0)}</AvatarFallback>
        </Avatar>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={handleUploadClick}
          className="absolute bottom-2 right-1 bg-black/50 rounded-full p-1"
        >
          <Camera className="text-white w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-x-4 my-auto">
        <h3 className="text-center justify-center text-white text-lg font-bold">
          {me?.fullName || "Loading..."}
        </h3>
      </div>
    </div>
  );
};