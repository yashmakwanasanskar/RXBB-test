import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import PrivateRoute from "@/routes/private-routes";
import { LayoutProvider } from "./components/shared/LayoutContext";
import LoadingScreen from "./components/shared/loading-screen";
import NoInternetConnection from "./components/shared/NoInternetConnection";
import { Toaster } from "react-hot-toast";

// Lazy loaded components
const NewEvent = lazy(() => import("./pages/events/add-edit-event"));
const Home = lazy(() => import("./pages/dashboard"));
const PatientList = lazy(() => import("./pages/patient/patient"));
const ViewPatient = lazy(
  () => import("./pages/patient/patient-edit/patient-edit")
);
const AddPatient = lazy(() => import("./pages/patient/add-patient/page"));
const Location = lazy(() => import("./pages/location/location"));
const SignInPage = lazy(() => import("./pages/auth/login"));
const Appointment = lazy(() => import("./pages/appointments/appointments"));
const AppointmentView = lazy(
  () => import("./pages/appointments/appointment-edit/appointment-edit")
);
const AddCMR = lazy(
  () => import("./pages/cmr-service/add-cmr-service/add-cmr-service")
);
const ViewCMR = lazy(
  () => import("./pages/cmr-service/cmr-service-edit/cmr-service-edit")
);
const Schedule = lazy(() => import("./pages/schedule/schedule"));
const Events = lazy(() => import("./pages/events/events"));
const Booking = lazy(() => import("./pages/booking/booking"));
const UserProfile = lazy(() => import("./pages/user-profile/profile"));
const EditImmunization = lazy(
  () => import("./pages/immunization/immunization-edit")
);
const AddImmunization = lazy(
  () => import("./pages/immunization/immunization-add")
);
const AppRoutes: React.FC = () => {
  const [getDoctypeStatus, setDocTypeStatus] = useState<any>();

  return (
    <LayoutProvider>
      <NoInternetConnection>
        <Toaster />
        <Router>
          <Layout excludedRoutes={["/auth/login", "/booking"]}>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/auth/login" element={<SignInPage />} />

                <Route path="/" element={<PrivateRoute element={<Home />} />} />
                <Route
                  path="/patients"
                  element={<PrivateRoute element={<PatientList />} />}
                />
                <Route
                  path="/patients/:id"
                  element={<PrivateRoute element={<ViewPatient />} />}
                />
                <Route
                  path="/patients/add-patient"
                  element={<PrivateRoute element={<AddPatient />} />}
                />
                <Route
                  path="/appointments"
                  element={<PrivateRoute element={<Appointment />} />}
                />
                <Route
                  path="/appointments/:id"
                  element={<PrivateRoute element={<AppointmentView />} />}
                />
                <Route
                  path="/cmr-service/add-cmr-service"
                  element={<PrivateRoute element={<AddCMR />} />}
                />
                <Route
                  path="/cmr-service/:id"
                  element={<PrivateRoute element={<ViewCMR />} />}
                />
                <Route
                  path="/events"
                  element={<PrivateRoute element={<Events />} />}
                />
                <Route
                  path="/events/add-event"
                  element={<PrivateRoute element={<NewEvent from="add" />} />}
                />
                <Route
                  path="/events/:id"
                  element={<PrivateRoute element={<NewEvent from="edit" />} />}
                />

                <Route
                  path="/events/manage-locations"
                  element={<PrivateRoute element={<Location />} />}
                />

                <Route
                  path="/profile"
                  element={<PrivateRoute element={<UserProfile />} />}
                />
                <Route
                  path="/immunization-service/add-immunization-service"
                  element={<PrivateRoute element={<AddImmunization />} />}
                />
                <Route
                  path="/immunization-service/:id"
                  element={<PrivateRoute element={<EditImmunization />} />}
                />
                <Route path="/booking" element={<Booking />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </NoInternetConnection>
    </LayoutProvider>
  );
};

export default AppRoutes;
