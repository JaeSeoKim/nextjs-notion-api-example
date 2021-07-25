import dayjs from "dayjs";

const getFormatTime = (
  datetime: Date | string,
  format: string = "YYYY-MM-DD HH:mm"
) => {
  return dayjs(datetime).format(format);
};

export default getFormatTime;
