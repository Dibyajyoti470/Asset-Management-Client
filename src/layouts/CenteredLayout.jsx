import Header from "../components/auth/Header";

const CenteredLayout = ({ children }) => {
  return (
    <>
      <Header showAuthMenu={true} />
      <main className="flex justify-center items-center py-28">
        <div className="container flex justify-center items-center gap-4 mx-auto px-40 h-max">
          {children}
        </div>
      </main>
    </>
  );
};

export default CenteredLayout;
