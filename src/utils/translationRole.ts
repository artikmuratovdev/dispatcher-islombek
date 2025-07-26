import { useMemo } from "react";

const roleTranslations: Record<string, string> = {
  CEO: "CEO",
  ADMIN: "Admin",
  BAKER: "Yopuvchi",
  DRIVER: "Haydovchi",
  SUPLIER: "Ta'minotchi",
  DIVIDER: "Parkashchi",
  CUSTOMER: "Mijoz",
  DOUGHMAKER: "Xamirchi",
  DISPaTCHER: "Dispatcher",
};
export const useTranslateRoles = (role: string) =>
  useMemo(() => {
    if (typeof role !== "string") {
      console.error("Role must be a string");
      return role;
    }

    return roleTranslations[role] || role;
  }, [role]);
