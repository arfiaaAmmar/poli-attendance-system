import { useNavigate } from "react-router-dom";

type PageTypeThumbnailButtonProp = {
  path: string;
  title: string;
  logo: string;
};

export const MainPageOptionThumbnail = ({
  path,
  title,
  logo,
}: PageTypeThumbnailButtonProp) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white text-center rounded-lg p-4 cursor-pointer m-auto transform hover:scale-105 transition duration-300 ease-in-out"
      onClick={() => {
        navigate(path);
      }}
    >
      <p className="font-bold text-lg">{title}</p>
      <img
        src={logo}
        alt=""
        className="w-80 h-80 object-contain hover:cursor-pointer"
      />
    </div>
  );
};
