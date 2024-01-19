const Title = (props) => {
    const { title, size, className, subTitle } = props;

    return (
        <div className={size === "sm" ? "flex gap-1" : ""}>
            <div className={className}>{title}</div>
            <div className="text-xs">{subTitle}</div>
        </div>
    );
};

export default Title;
