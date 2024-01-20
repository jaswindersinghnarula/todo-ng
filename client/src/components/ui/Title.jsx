const Title = (props) => {
    const { title, size, className, subTitle } = props;

    return (
        <div
            className={
                size === "sm" ? "flex items-center justify-between w-11/12" : ""
            }
        >
            <div className={`font-semibold ${className}`}>{title}</div>
            <div className="text-xs">{subTitle}</div>
        </div>
    );
};

export default Title;
