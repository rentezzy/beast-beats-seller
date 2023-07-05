import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { useState, useEffect } from "react";
dayjs.extend(relativeTime.default);


export const useGetTimeFromNow = (time: string) => {
  const [timeAgo, setTimeAgo] = useState(dayjs(time).fromNow());
  useEffect(() => {
    const i = setInterval(() => {
      setTimeAgo(dayjs(time).fromNow());
    }, 30000);

    return () => clearInterval(i);
  }, [time]);
  return timeAgo;
};
