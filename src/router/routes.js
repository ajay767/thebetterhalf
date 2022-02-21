import Landing from "@pages/landing";
import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";
import ForgetPassword from "@pages/auth/ForgetPassword";
import Home from "@pages/home";
import Profile from "@pages/auth/profile";
import Chat from "@pages/chat";
import User from "@pages/user";
import Conversation from "@pages/Conversation";
import Notification from "@pages/Notification";
import Friends from "@pages/friends";
import Setting from "@pages/setting";

const routes = [
  { path: "/launch", component: Landing, auth: false, exact: true },
  { path: "/login", component: Login, auth: false, exact: true },
  { path: "/signup", component: Signup, auth: false, exact: true },
  {
    path: "/forget-password",
    component: ForgetPassword,
    auth: false,
    exact: true,
  },
  { path: "/home", component: Home, auth: true, exact: true },
  { path: "/friends", component: Friends, auth: true, exact: false },
  { path: "/notification", component: Notification, auth: true, exact: true },
  { path: "/profile", component: Profile, auth: true, exact: true },
  { path: "/setting", component: Setting, auth: true, exact: true },
  { path: "/chat", component: Chat, auth: true, exact: true },
  { path: "/chat/:id", component: Conversation, auth: true, exact: true },
  { path: "/user/:id", component: User, auth: true, exact: true },
];

export default routes;
