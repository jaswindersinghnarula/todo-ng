import { useEffect } from "react";
import config from "../utils/config";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Content from "../components/common/Content";
import Todos from "../features/todo/Todos";
const Main = () => {
    useEffect(() => {
        document.title = `${config().appName} ${config().appVersion}`;
    }, []);
    return (
        <div className="main-page">
            <Header />
            <Content element={<Todos />} />
            <Footer />
        </div>
    );
};

export default Main;
