import { Route, Routes, Navigate } from "react-router-dom";

import { Login } from "../../pages/auth/Login/Login";

import {
  // Login,
  ContactPage,
  Courses,
  Home,
  ServicesPage,
  TablesPage,
  TeamPage,
  UsefulResourcePage,
  StaffCreate,
  RegionPage,
  OrganizationPage,
  AboutUsPage,
  Groups,
  GroupSinglePage,
  NewsPage,
  NewsSinglePage,
} from "../../pages/Admin";

import { StudentsPage } from "../../pages/Kadr";

import {
  StudentPage,
  TeachersPage,
  RoomsPage,
  HomePageMan,
  Attendance,
  AttendanceSingle,
  RoomSingle,
  TypeSingle,
  TableTypeSingle,
} from "../../pages/Modirator";
import PrivateRoute from "../Private/Private";
import PrivateRouteKadr from "../Private/PrivateKadr";
import PrivateRouteMan from "../Private/PrivateMan";
import { Layout } from "../../Layout/Layout";
import { AccountRegister } from "../../pages/auth/Registers/AccountRegister";

export function Router() {
  return (
    <Routes>
      <Route
        path="/dashboard/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard/" element={<Home />} />
        <Route path="/dashboard/about-us" element={<AboutUsPage />} />
        <Route path="/dashboard/courses" element={<Courses />} />
        <Route path="/dashboard/tables" element={<TablesPage />} />
        <Route path="/dashboard/services" element={<ServicesPage />} />
        <Route path="/dashboard/contact" element={<ContactPage />} />
        <Route path="/dashboard/team" element={<TeamPage />} />
        <Route path="/dashboard/news" element={<NewsPage />} />
        <Route
          path="/dashboard/useful-resources"
          element={<UsefulResourcePage />}
        />
        <Route path="/dashboard/staff-create" element={<StaffCreate />} />
        <Route path="/dashboard/register" element={<AccountRegister />} />
        <Route path="/dashboard/regions" element={<RegionPage />} />
        <Route path="/dashboard/organizations" element={<OrganizationPage />} />
        <Route path="/dashboard/groups" element={<Groups />} />
        <Route
          path="/dashboard/groups/:groupId"
          element={<GroupSinglePage />}
        />
        <Route path="/dashboard/news/:newsId" element={<NewsSinglePage />} />
      </Route>
      <Route
        path="/kadr/"
        element={
          <PrivateRouteKadr>
            <Layout />
          </PrivateRouteKadr>
        }
      >
        <Route path="/kadr/" element={<Home />} />
        <Route path="/kadr/students" element={<StudentsPage />} />
      </Route>
      <Route
        path="/manager/"
        element={
          <PrivateRouteMan>
            <Layout />
          </PrivateRouteMan>
        }
      >
        <Route path="/manager/" element={<HomePageMan />} />
        <Route path="/manager/students" element={<StudentPage />} />
        <Route path="/manager/attendances/:groupId" element={<Attendance />} />
        <Route path="/manager/teachers" element={<TeachersPage />} />
        <Route path="/manager/rooms" element={<RoomsPage />} />
        <Route
          path="/manager/students/:studentId"
          element={<AttendanceSingle />}
        />
        <Route path="/manager/room-single" element={<RoomSingle />} />
        <Route path="/manager/type-single" element={<TypeSingle />} />
        <Route
          path="/manager/table-type-single"
          element={<TableTypeSingle />}
        />
      </Route>

      <Route path="/auth-login" element={<Login />} />
      <Route path="/*" element={<Navigate to="/auth-login" />} />
    </Routes>
  );
}
