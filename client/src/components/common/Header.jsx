import config from "../../utils/config";
import Logo from "../ui/Logo";
import ThemeToggler from "../ui/ThemeToggler";

const Header = () => {
    return (
        <div className="pt-5 flex justify-between items-center">
            <Logo name={config().appName} version={config().appVersion} />
            <ThemeToggler />
        </div>
    );
};

export default Header;
