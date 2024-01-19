import Empty from "../../../../components/common/Empty";
import Item from "./Item";

const AllItems = (props) => {
    const { items } = props;
    return (
        <div className="mx-6 mt-2 p-2">
            {!items.length ? (
                <Empty />
            ) : (
                items.map((item) => {
                    return <Item key={item.id} {...item} />;
                })
            )}
        </div>
    );
};

export default AllItems;
