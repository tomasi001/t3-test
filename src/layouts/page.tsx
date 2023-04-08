import { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen justify-center border-slate-400">
      <div className="h-full w-full overflow-y-scroll border-x md:max-w-2xl">
        {children}
      </div>
    </main>
  );
};

export default PageLayout;
