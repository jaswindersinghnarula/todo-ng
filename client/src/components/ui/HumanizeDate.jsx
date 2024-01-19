import moment, { now } from "moment";
const HumanizeDate = (props) => {
    const { text, date } = props;
    return `${text} ${moment(date).from()}`;
};

export default HumanizeDate;
