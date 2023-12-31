import NotificationsIcon from "@mui/icons-material/Notifications";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonIcon from "@mui/icons-material/Person";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentIcon from "@mui/icons-material/Assignment";
import ErrorIcon from "@mui/icons-material/Error";
import { SidebarRoute } from "shared-library/src/declarations/types";
import {
  STUDENT_PAGES_TITLE,
  STUDENT_PAGES_PATH,
  ADMIN_PAGES_TITLE,
  ADMIN_PAGES_PATH,
} from "shared-library/src/declarations/constants";

export const studentSidebarRoutes: SidebarRoute[] = [
  {
    displayText: STUDENT_PAGES_TITLE.halamanUtama,
    path: STUDENT_PAGES_PATH.halamanUtama,
    icon: <HomeOutlinedIcon />
  },
  {
    displayText: STUDENT_PAGES_TITLE.borangPendaftaran,
    path: STUDENT_PAGES_PATH.borangPendaftaran,
    icon: <AssignmentIcon />,
    children: [
      {
        displayText: STUDENT_PAGES_TITLE.borangPendaftaranMasuk,
        path: STUDENT_PAGES_PATH.borangPendaftaranMasuk,
      },
      {
        displayText: STUDENT_PAGES_TITLE.borangPendaftaranKeluar,
        path: STUDENT_PAGES_PATH.borangPendaftaranKeluar,
      },
    ],
  },
  {
    displayText: STUDENT_PAGES_TITLE.aduanPelajar,
    path: STUDENT_PAGES_PATH.aduanPelajar,
    icon: <ErrorIcon />,
    children: [
      {
        displayText: STUDENT_PAGES_TITLE.kerosakanFasiliti,
        path: STUDENT_PAGES_PATH.kerosakanFasiliti,
        icon: <ErrorIcon />,
      },
      {
        displayText: STUDENT_PAGES_TITLE.disiplinPelajar,
        path: STUDENT_PAGES_PATH.disiplinPelajar,
        icon: <ErrorIcon />,
      },
    ],
  },
  {
    displayText: STUDENT_PAGES_TITLE.notifikasi,
    path: STUDENT_PAGES_PATH.notifikasi,
    icon: <NotificationsIcon />,
  },
];

export const adminSidebarRoutes: SidebarRoute[] = [
  {
    displayText: ADMIN_PAGES_TITLE.halamanUtama,
    path: ADMIN_PAGES_PATH.halamanUtama,
    icon: <HomeOutlinedIcon />,
  },
  {
    displayText: ADMIN_PAGES_TITLE.pengurusanProfil,
    path: ADMIN_PAGES_PATH.pengurusanProfil,
    icon: <PersonIcon />,
  },
  {
    displayText: ADMIN_PAGES_TITLE.pengurusanPendaftaran,
    path: ADMIN_PAGES_PATH.pengurusanPendaftaran,
    icon: <WorkOutlineIcon />,
    children: [
      {
        displayText: ADMIN_PAGES_TITLE.pendaftaranBaru,
        path: ADMIN_PAGES_PATH.pendaftaranBaru,
        icon: <AssignmentIcon />,
      },
      {
        displayText: ADMIN_PAGES_TITLE.pendaftaranKeluar,
        path: ADMIN_PAGES_PATH.pendaftaranKeluar,
        icon: <AssignmentIcon />,
      },
    ],
  },
  {
    displayText: ADMIN_PAGES_TITLE.pengurusanAduan,
    path: ADMIN_PAGES_PATH.pengurusanAduan,
    icon: <ErrorIcon />,
    children: [
      {
        displayText: ADMIN_PAGES_TITLE.masalahDisiplin,
        path: ADMIN_PAGES_PATH.masalahDisiplin,
        icon: <ErrorIcon />,
      },
      {
        displayText: ADMIN_PAGES_TITLE.kerosakanFasiliti,
        path: ADMIN_PAGES_PATH.kerosakanFasiliti,
        icon: <ErrorIcon />,
      },
    ],
  },
  {
    displayText: ADMIN_PAGES_TITLE.notifikasi,
    path: ADMIN_PAGES_PATH.notifikasi,
    icon: <NotificationsIcon />,
  },
];
