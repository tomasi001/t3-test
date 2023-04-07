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
  return <LoadingSpinner />;
};

export const LoadingPage = () => {
  return (
    <div className="absolute right-0 top-0  flex h-screen w-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};
