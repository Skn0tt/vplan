import moment from "moment";
import "moment/locale/de";

export default (d: Date) =>
  moment(d)
    .locale("de")
    .format("dddd, D. MMMM");
