import { useContext } from "react";

import CommonContext from "contexts/CommonProvider";

export default function useCommon() {
  const { loading, setLoading } = useContext(CommonContext);

  return { loading, setLoading };
}
