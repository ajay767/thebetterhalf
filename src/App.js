import { useEffect } from "react";
import Router from "@router";
import { Toaster } from "react-hot-toast";
import "tippy.js/dist/tippy.css";

function App() {
  useEffect(() => {
    document.title = `Find your better half`;
  }, []);
  return (
    <div className="App bg-slate-100 min-h-screen   text-gray-700">
      <Toaster containerClassName="text-sm" />
      <Router />
    </div>
  );
}

export default App;
