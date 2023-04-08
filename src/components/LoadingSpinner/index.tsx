export const LoadingSpinner = () => {
  return (
    <div className="absolute right-0 top-0  flex h-screen w-screen items-center justify-center">
      <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
        <div className="border-white-900 h-32 w-32 animate-spin rounded-full border-b-2 border-t-2"></div>
      </div>
    </div>
  );
};

export const LoadingComponent = () => {
  return (
    <div className="mr-2 flex h-full items-center justify-center space-x-2">
      <div className="h-2 w-2 animate-pulse rounded-full dark:bg-white"></div>
      <div className="h-2 w-2 animate-pulse rounded-full dark:bg-white"></div>
      <div className="h-2 w-2 animate-pulse rounded-full dark:bg-white"></div>
    </div>
  );
};

export const LoadingPage = () => {
  return (
    <div className="absolute right-0 top-0  flex h-screen w-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};
