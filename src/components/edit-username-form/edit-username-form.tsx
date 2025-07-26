import { BottomSheet } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "@/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui";
export const EditUserNameForm = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, formState } = useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (formValues: any) => {
    console.log(formValues);
  };

  return (
    <>
      <div
        className="bg-white rounded-lg p-3 flex gap-x-[8px] items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Edit className="text-[#1b2b56]" />
        <h4 className="text-center text-[#1b2b56] text-sm font-black">
          Usernameni o’zgartirish
        </h4>
      </div>
      <BottomSheet open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          <div className="w-full py-10">
            <Label htmlFor="name" className="text-right text-[#ffcb15]">
              Username
            </Label>
            <Controller
              name="edit_username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <Input
                  className="w-full font-semibold bg-white rounded-lg border border-[#ffcb15] flex-col justify-start items-start gap-3 inline-flex"
                  placeholder="Usernameni kiriting"
                  {...field}
                />
              )}
            />
            <p className="text-sm mt-1 ml-1 text-red-600">
              {typeof formState.errors.edit_username?.message === "string" &&
                formState.errors.edit_username.message}
            </p>

            <Button
              type="submit"
              className="mt-6 w-full py-[3px] bg-[#ffcb15] rounded-lg text-[#1b2b56] hover:text-white justify-center items-center"
            >
              Yuborish
            </Button>
          </div>
        </form>
      </BottomSheet>
    </>
  );
};
