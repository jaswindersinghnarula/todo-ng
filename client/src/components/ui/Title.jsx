const Title = (props) => {
  const { title, postTitle, size, className, subTitle } = props;

  return (
    <div
      className={
        size === "sm" ? "flex items-center justify-between w-11/12" : ""
      }
    >
      <div>
        <span className={`font-semibold ${className}`}>{title}</span>
        <span className="ml-2 font-thin text-xs text-gray-400 dark:text-gray-500 no-underline">
          {postTitle}
        </span>
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500">{subTitle}</div>
    </div>
  );
};

export default Title;
