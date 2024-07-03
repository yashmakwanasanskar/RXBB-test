import { NotFoundPageIcon } from "@/constants/images";
import React, { useState, useEffect } from "react";

const NotFoundPage = () => {
  return (
    <div className="bg-[#F6F9FD]">
      <img src={NotFoundPageIcon.path} alt={NotFoundPageIcon.alt} />
    </div>
  );
};

const NoInternetConnection: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  // if user is online, return the child component else return a custom component
  if (isOnline) {
    return children;
  } else {
    return <NotFoundPage />;
  }
};

export default NoInternetConnection;
