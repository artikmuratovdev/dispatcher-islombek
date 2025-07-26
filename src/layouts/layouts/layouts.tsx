import { useMemo } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Footer } from "../footer";

const PUBLIC_ROUTES = ["/login", "/sale", "/message", "/chat/:id", "notifications", "/dashboard/new-order", "order", "/customers/customer-details"];

export const Layouts = ({
  children,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) => {
  const { pathname } = useLocation();

  const isAuth = useMemo(() => {
    return !PUBLIC_ROUTES.some((route) => matchPath({ path: route }, pathname));
  }, [pathname]);

  return (
    <div>
      {children}
      {isAuth && <Footer />}
    </div>
  );
};
