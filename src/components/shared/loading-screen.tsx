import { RXBBShortLogoIcon } from "@/constants/images";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-full">
      <img src={RXBBShortLogoIcon.path} alt="Loading..." className="w-20 h-20 animate-pulse" />
    </div>
  );
};

export default LoadingScreen