import Landing from "@pages/landing";
import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";
import ForgetPassword from "@pages/auth/ForgetPassword";
import Home from "@pages/home";
import Profile from "@pages/profile";
import Chat from "@pages/chat";
import Conversation from "@pages/Conversation";
import Notification from "@pages/Notification";
const routes = [
  { path: "/launch", component: Landing, auth: [], exact: true },
  { path: "/login", component: Login, auth: [], exact: true },
  { path: "/signup", component: Signup, auth: [], exact: true },
  {
    path: "/forget-password",
    component: ForgetPassword,
    auth: [],
    exact: true,
  },
  { path: "/home", component: Home, auth: [], exact: true },
  { path: "/notification", component: Notification, auth: [], exact: true },
  { path: "/profile", component: Profile, auth: [], exact: true },
  { path: "/chat", component: Chat, auth: [], exact: true },
  { path: "/chat/:id", component: Conversation, auth: [], exact: true },
];

export default routes;
