import CheckBadge from "./icons/CheckBadge";
import config from "../../utils/config";
const Logo = (props) => {
    const { name, version } = props;
    return (
        <div className="flex gap-1  group">
            <CheckBadge className="transition duration-300 w-9 h-9 text-green-500 group-hover:text-green-700" />
            <h1 className="text-3xl font-bold flex gap-1 items-baseline">
                {name || "App Name"}
                <span className="text-sm font-thin">V{version || "0.0"}</span>
            </h1>
        </div>
    );
};

export default Logo;
