import { useEffect } from "react";

function useBeforeUnloadConfirm() {

  const handleUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    }
  },[]);

}

export default useBeforeUnloadConfirm;
