import { ReactNode } from "react";

export interface Tab {
  label: string;
  children: ReactNode;
  value?: string;
}

export type Props = {
  tabs: Tab[];
  defaultTabIndex?: number;
  contentClassName?: string;
  tabsClassName?: string;
  tabClassName?: string;
  setValue?: (value: string) => void;
};
