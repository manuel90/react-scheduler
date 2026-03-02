import { useEffect, useEffectEvent, useState } from "react";

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  const onHandleIsClient = useEffectEvent(() => {
    setIsClient(true);
  });

  useEffect(() => {
    onHandleIsClient();
  }, []);

  return isClient;
}

export default useIsClient;