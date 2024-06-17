import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth-context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/shared/layout/Layout";
import {
  LoginPage,
  DashboardPage,
  ProductsPage,
  AddProductPage,
  UsersPage,
  CategoriesPage,
  AddCategoryPage,
  JobsPage,
  DisabilitiesPage,
  AddJobPage,
  AddDisabilityPage,
} from "./pages";

const App = () => {
  const { token, login } = useContext(AuthContext);
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedUserData &&
      storedUserData.token &&
      new Date(storedUserData.expiration) > new Date()
    ) {
      login(
        storedUserData.userId,
        storedUserData.token,
        new Date(storedUserData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard/products" element={<ProductsPage />} />
          <Route path="/dashboard/addProduct" element={<AddProductPage />} />
          <Route path="/dashboard/categories" element={<CategoriesPage />} />
          <Route path="/dashboard/addcategory" element={<AddCategoryPage />} />
          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/jobs" element={<JobsPage />} />
          <Route path="/dashboard/addjob" element={<AddJobPage />} />
          <Route
            path="/dashboard/disabilities"
            element={<DisabilitiesPage />}
          />
          <Route
            path="/dashboard/adddisability"
            element={<AddDisabilityPage />}
          />
        </Route>
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Navigate to="/login" />} />
        <Route path="/dashboard/products" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard/addProduct"
          element={<Navigate to="/login" />}
        />
        <Route
          path="/dashboard/categories"
          element={<Navigate to="/login" />}
        />
        <Route
          path="/dashboard/addcategory"
          element={<Navigate to="/login" />}
        />
        <Route path="/dashboard/users" element={<Navigate to="/login" />} />
        <Route path="/dashboard/jobs" element={<Navigate to="/login" />} />
        <Route path="/dashboard/addjob" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard/disabilities"
          element={<Navigate to="/login" />}
        />
        <Route
          path="/dashboard/adddisability"
          element={<Navigate to="/login" />}
        />
      </>
    );
  }

  return (
    <main className="bg-neutral-100 overflow-clip relative">
      <Router>
        <Routes>{routes}</Routes>
      </Router>
    </main>
  );
};

export default App;
