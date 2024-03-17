import { useEffect } from "react";
import config from "../utils/config";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Content from "../components/common/Content";
import Todos from "../features/todo/Todos";
import useCommon from "hooks/useCommon";
import Loader from "components/common/Loader";
const Main = () => {
  const { loading } = useCommon();
  useEffect(() => {
    document.title = `${config().appName} ${config().appVersion}`;
  }, []);
  return (
    <div className="main-page">
      <Header />
      <Content element={<Todos />} />
      <Footer />
      {loading && <Loader />}
    </div>
  );
};

export default Main;
