import { Customer, HomeIcons, MessagesIcons, Profile } from "@/icons";

export const MAIN_TABS_LINK = [
  {
    id: 1,
    title: "Asosiy",
    path: "/dashboard",
    icon: <HomeIcons />,
  },
  {
    id: 2,
    title: "Mijozlar",
    path: "/customers",
    icon: <Customer />,
  },
  {
    id: 3,
    title: "Messeges",
    path: "/messages",
    icon: <MessagesIcons />,
  },
  {
    id: 4,
    title: "Profile",
    path: "/profile",
    icon: <Profile />,
  },
];
