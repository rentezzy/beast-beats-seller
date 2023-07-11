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

export const useGetTimeAt = (time: number) => {
  if (time === 0) return "";
  return ", at " + dayjs(new Date(0, 0, 0, 0, 0, time)).format("mm:ss");
};
export const useGetMusicTime = () => {
  return (time: number) => dayjs(new Date(0, 0, 0, 0, 0, time)).format("mm:ss");
};
export const useGetTimePublished = (time: string) => {
  return dayjs(new Date(time)).format("YYYY, DD MMM. - HH:mm");
};

export const useReplyes = () => {
  const [replyesOpened, setReplyesOpened] = useState(false);
  const [replyOpened, setReplyOpened] = useState(false);

  const replyesHandler = () => {
    setReplyesOpened((prev) => !prev);
  };
  const replyHandler = () => {
    setReplyOpened((prev) => !prev);
  };
  return { replyOpened, replyesOpened, replyHandler, replyesHandler };
};
