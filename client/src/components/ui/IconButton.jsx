const IconButton = ({ icon, clickHandler }) => {
    return (
        <a
            className="flex justify-center gap-1"
            href="#"
            onClick={(e) => {
                e.preventDefault();
                clickHandler();
            }}
        >
            {icon}
        </a>
    );
};

export default IconButton;
