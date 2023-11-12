import { Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ADMIN_PAGES_PATH,
  STUDENT_PAGES_PATH,
} from "shared-library/src/declarations/constants.js";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderCard = (title, imagePath, path) => (
    <div
      className="bg-white rounded-lg p-4 cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
      onClick={() => navigate(path)}
    >
      <p className="font-bold text-lg">{title}</p>
      <img
        src={imagePath}
        alt={title}
        className="w-40 h-40 object-contain hover:cursor-pointer"
      />
    </div>
  );

  const renderHomePage = () => {
    const studentPages = [
      {
        title: "DAFTAR MASUK",
        path: STUDENT_PAGES_PATH.borangPendaftaranMasuk,
        image: "https://logowik.com/content/uploads/images/student5651.jpg",
      },
      {
        title: "DAFTAR KELUAR",
        path: STUDENT_PAGES_PATH.borangPendaftaranMasuk,
        image:
          "https://cdn.vectorstock.com/i/preview-1x/35/93/admin-administration-people-icon-vector-47263593.jpg",
      },
      {
        title: "ADUAN PELAJAR",
        path: STUDENT_PAGES_PATH.aduanPelajar,
        image:
          "https://cdn.vectorstock.com/i/preview-1x/35/93/admin-administration-people-icon-vector-47263593.jpg",
      },
    ];

    const supervisorPages = [
      {
        title: "PENDAFTARAN MASUK",
        path: ADMIN_PAGES_PATH.pendaftaranBaru,
        image: "https://logowik.com/content/uploads/images/student5651.jpg",
      },
      {
        title: "PENDAFTARAN KELUAR",
        path: ADMIN_PAGES_PATH.pendaftaranKeluar,
        image:
          "https://cdn.vectorstock.com/i/preview-1x/35/93/admin-administration-people-icon-vector-47263593.jpg",
      },
      {
        title: "ADUAN PELAJAR",
        path: ADMIN_PAGES_PATH.pengurusanAduan,
        image:
          "https://cdn.vectorstock.com/i/preview-1x/35/93/admin-administration-people-icon-vector-47263593.jpg",
      },
    ];

    const pagesToRender = location.pathname.includes("pelajar")
      ? studentPages
      : supervisorPages;

    return (
      <div className="flex gap-4 justify-center mt-16">
        {pagesToRender.map((page, index) => (
          <div key={index}>{renderCard(page.title, page.image, page.path)}</div>
        ))}
      </div>
    );
  };

  return (
    <Paper className="p-4 border rounded-md border-gray-300 h-screen">
      <Typography
        variant="h5"
        className="text-3xl text-white rounded-3xl font-semibold mb-4 bg-blue-800 p-2"
      >
        Halaman Utama
      </Typography>
      {renderHomePage()}
    </Paper>
  );
};

export default HomePage;
