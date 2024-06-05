import { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { me } from "./store/authSlice";

import { fetchCategories } from "./store/categorySlice";
import Home from "./pages_mobile/Home/Index";
import Register from "./pages_mobile/Register/Index";
import Login from "./pages_mobile/Login/Index";
import ForgotPassword from "./pages_mobile/ForgotPassword/Index";
import ResetPassword from "./pages_mobile/ResetPassword/Index";
import Chat from "./pages_mobile/Chat/Index";
import PostAd from "./pages_mobile/PostAd/Index";
import Wishlist from "./pages_mobile/Wishlist/Index";
import Profile from "./pages_mobile/Profile/Index";
import Cart from "./pages_mobile/Cart/Index";
import Search from "./pages_mobile/Search";
import MobileLayout from "./components_mobile/MobileLayout";
import Splash from "./components_mobile/Splash";
import UserProfile from "./pages_mobile/Profile/UserProfile";
import ChangePassword from "./pages_mobile/Profile/ChangePassword";
import DeleteAccount from "./pages_mobile/Profile/DeleteAccount";
import SavedSearches from "./pages_mobile/Profile/SavedSearches";
import Ad from "./pages_mobile/Ad";
import Pricing from "./pages_mobile/Pricing";
import ViewProfile from "./pages_mobile/Profile/ViewProfile";
import HelpDocs from "./pages_mobile/Help/HelpDocs";
import HelpDoc from "./pages_mobile/Help/HelpDoc";
import ContactUs from "./pages_mobile/ContactUs";
import { getNotifications, init, loadChats, socket } from "./socket";
import SingleChat from "./pages_mobile/Chat/SingleChat";
import {
  fetchCurrentLocation,
  setSelectedLocation,
} from "./store/locationSlice";
import { useLocalStorage } from "@uidotdev/usehooks";
import "./MobileApp.css";
import ChangeEmail from "./pages_mobile/Profile/ChangeEmail";

function MobileApp() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const routeLocation = useLocation();

  const { selectedLocation } = useSelector((state) => state.location);

  const [recentLocations, setRecentLocations] = useLocalStorage(
    "recentLocations",
    null
  );

  let p = routeLocation.pathname;
  p = p.replace(/\/[a-f\d]{24}/gi, "");

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(me());
    dispatch(fetchCurrentLocation());

    init(socket, dispatch);
    document.body.click();
    return () => socket.disconnect();
  }, []);
  useEffect(() => {
    user && loadChats(socket);
    user && getNotifications(socket);
  }, [user]);

  useEffect(() => {
    if (!selectedLocation && recentLocations?.length && recentLocations[0])
      dispatch(setSelectedLocation(recentLocations[0]));
  }, []);

  const handleOrientationChange = () => {
    if (window.orientation !== 0) {
      if (window.screen.orientation) {
        window.screen.orientation.lock("portrait").catch((error) => {});
      }
    }
  };

  useEffect(() => {
    window.addEventListener("orientationchange", handleOrientationChange);

    try {
      handleOrientationChange();
    } catch (error) {}

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);



  return (
    <>
      <Routes>
        <Route
          path="/register"
          exact
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          exact
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          exact
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          exact
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/verify"
          exact
          element={
            <h1>
              {" "}
              Please verify your account using the link sent to your email
            </h1>
          }
        />
        <Route
          path="/verified"
          exact
          element={<h1> Congratulations, your account has been verified!</h1>}
        />

        <Route
          path="/verify-password-reset"
          exact
          element={
            <h1>
              Please use the link sent to your email to reset your password
            </h1>
          }
        />
        <Route
          path="/reset-password-successful"
          exact
          element={
            <h1>
              Your password has been reset. You may log in with your new
              password now
            </h1>
          }
        />
      </Routes>

      <MobileLayout
        className={p === "/single-chat" ? "" : "mobile_layout"}
        hidden={[
          "/register",
          "/login",
          "/forgot-password",
          "/reset-password",
          "/verify",
          "/verified",
          "/verify-password-reset",
          "/reset-password-successful",
        ].includes(p)}
        showHeader={!["/verify", "/single-chat"].includes(p)}
        showFooter={
          !["/post-ad", "/verify", "/single-chat", "/edit"].includes(p)
        }
      >
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/messages"
            exact
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/single-chat/:id"
            exact
            element={
              <PrivateRoute>
                <SingleChat />
              </PrivateRoute>
            }
          />

          <Route path="/help" exact element={<HelpDocs />} />
          <Route path="/help-doc/:id" exact element={<HelpDoc />} />
          <Route path="contact-us" exact element={<ContactUs />} />

          <Route element={<Ad />} path="/listing/:id" />
          <Route element={<Ad />} path="/preview-ad" />
          <Route
            exact
            path="/post-ad"
            element={
              <PrivateRoute>
                <PostAd />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/edit/:id"
            element={
              <PrivateRoute>
                <PostAd edit={true} />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/wishlist/:tab"
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            exact
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/user_profile"
            exact
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/saved_searches"
            exact
            element={
              <PrivateRoute>
                <SavedSearches />
              </PrivateRoute>
            }
          />
          <Route
            path="/account_settings"
            exact
            element={
              <PrivateRoute>
                <ChangePassword />
                <ChangeEmail />
                <DeleteAccount />
              </PrivateRoute>
            }
          />
          <Route
            path="/pricing"
            exact
            element={
              <PrivateRoute>
                <Pricing />
              </PrivateRoute>
            }
          />

          <Route path="/cart" exact element={<Cart />} />
          <Route path="/search" exact element={<Search />} />
          <Route path="/view-profile" exact element={<ViewProfile />} />
          <Route path="/view-profile/:userId" exact element={<ViewProfile />} />
          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
      </MobileLayout>
    </>
  );
}

// PrivateRoute
// if user is logged in, allow access to the route
// wrap the routes that should only be accessed by logged in users in this component
function PrivateRoute({ children }) {
  let navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else {
    }
  }, [user]);

  return user === null ? <Splash /> : children;
}

// PublicRoute
// if user is logged in and tries to access login or register page, redirect to home
// wrap the login and register routes in this component and any other routes that should not be accessed by logged in users
function PublicRoute({ children }) {
  let navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return user === false ? <Splash /> : children;
}

export default MobileApp;
