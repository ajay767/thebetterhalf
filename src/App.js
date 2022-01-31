import { useEffect } from "react";
import Router from "@router";
import "tippy.js/dist/tippy.css";
function App() {
  useEffect(() => {
    document.title = "Find your better half";
  }, []);
  return (
    <div className="App bg-slate-100 min-h-screen md:p-4  text-gray-700">
      <Router />
    </div>
  );
}

export default App;
