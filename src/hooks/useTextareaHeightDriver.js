import { useEffect } from "react";

function useTextareaHeightDriver(ref, value) {
  useEffect(() => {
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, [value]);
}

export default useTextareaHeightDriver;
