import { BottomSheet } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
import { Button } from "../ui";
import { Password } from "@/icons";
export const EditPasswordForm = () => {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (formValues: any) => {
    console.warn(formValues);
    reset();
  };

  return (
    <>
      <div
        className="bg-white rounded-lg p-3 flex gap-x-[8px] items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Password className="text-[#1b2b56]" />
        <h4 className="text-center text-[#1b2b56] text-sm font-black">
          Profile parolini o’zgartirish
        </h4>
      </div>
      <BottomSheet open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          <div className="w-full py-10">
            <Label htmlFor="name" className="text-right text-[#ffcb15]">
              Parol
            </Label>
            <Controller
              name="edit_password"
              control={control}
              rules={{ required: "Parolni kiriting" }}
              render={({ field }) => (
                <>
                  <Input
                    className="w-full font-semibold bg-white rounded-lg border border-[#ffcb15] flex-col justify-start items-start gap-3 inline-flex "
                    placeholder="Passwordni kiriting"
                    {...field}
                  />
                  <p className="text-red-600 text-sm mt-1">
                    {errors.edit_password?.message as string}
                  </p>
                </>
              )}
            />

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
