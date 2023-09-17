import type { Metadata } from "next";
import NotFound from "./_components/NotFound/NotFound";
import TopNav from "./_components/TopNav/TopNav";

export const metadata: Metadata = {
  title: "Lily Health - Page Not Found",
};

export default function NotFoundPage() {
  return (
    <>
      <TopNav />
      <NotFound />
    </>
  );
}
