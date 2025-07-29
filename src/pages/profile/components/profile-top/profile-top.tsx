import { useMeQuery } from '@/app/api/authApi';
import { useUploadImageMutation } from '@/app/api/uploadImg/uploadImg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHandleRequest } from '@/hooks/use-handle-request/use-handle-reuqest';
import { Camera } from '@/icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const ProfileTop = () => {
  const { data: user } = useMeQuery(' ');
  const form = useForm();
  // const [editProfile] = useEditMutation();
  const [uploadImage] = useUploadImageMutation();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );
  const handleRequest = useHandleRequest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName,
        avatar: user.avatar,
      });
    }
  }, [user, form]);

  // const handleFileChange = async (formState: any) => {
  //   await handleRequest({
  //     request: async () => {
  //       let userImage = formState.avatar;
  //       if (selectedImage) {
  //         const formData = new FormData();
  //         formData.append('file', selectedImage);
  //         userImage = await uploadImage(formData).unwrap();
  //       }
  //       const result = await editProfile({
  //         _id: user?._id,
  //         fullName: formState.fullName,
  //         avatar: userImage,
  //       }).unwrap();
  //       return result;
  //     },
  //     onSuccess: () => {
  //       toast.success("Muvaffaqiyatli o'zgartirildi!");
  //       setIsModalOpen(false);
  //     },
  //   });
  // };

  // useEffect(() => {
  //   if (selectedImage) {
  //     handleFileChange(form.getValues());
  //   }
  // }, [selectedImage, form.watch('fullName')]);

  return (
    <div className='border-b-2 border-[#FFCC15] pb-6 rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full'>
      <form 
      // onSubmit={form.handleSubmit(handleFileChange)}
      >
        <div className='flex w-[95%] m-auto gap-x-3 items-center'>
          <div className='relative'>
            <Avatar className='w-[116px] h-[116px]'>
              <AvatarImage
                className='w-[116px] h-[116px]'
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : user?.avatar
                }
                alt='Avatar'
              />
              <AvatarFallback>
                {user?.fullName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className='absolute -bottom-1 right-1 !h-9 !w-9'>
              <Label htmlFor='picture' className='w-full'>
                <Camera className='!h-9 !w-9' />
              </Label>
              <Input
                id='picture'
                type='file'
                accept='image/*'
                onChange={(e) => setSelectedImage(e.target.files?.[0])}
                className='hidden'
              />
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <h5 className='text-center text-white text-base font-semibold leading-[31.20px]'>
              {user?.fullName}
            </h5>
          </div>
        </div>
      </form>
    </div>
  );
};
