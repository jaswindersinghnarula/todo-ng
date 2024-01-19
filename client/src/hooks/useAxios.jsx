import axios from "axios";
import config from "../utils/config";
const useAxios = () => {
    axios.defaults.baseURL = config().serverUrl;
    return { axios };
};

export default useAxios;
