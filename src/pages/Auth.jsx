import React, { useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../contexts/Context";
import Header from "../components/auth/Header";
import heroImage from "../assets/hero.png";

const Auth = (props) => {
  const navigate = useNavigate();
  const { user, verified } = useContext(GlobalContext);

  useEffect(() => {
    if (user && verified) {
      navigate("/dashboard");
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <Header />
        <main className="flex justify-center items-center pt-10">
          <div className="container flex gap-4 mx-auto px-40 h-max">
            <section className="flex flex-col gap-20 w-3/5">
              <h1 className="text-primary text-3xl font-medium w-3/6">
                Lets build something beautiful together.
              </h1>
              <img className="w-4/5" src={heroImage} alt="hero" />
            </section>
            {/* <section>{props.children}</section> */}
            <Outlet />
          </div>
        </main>
      </>
    );
  }
  return null;
};

export default Auth;
