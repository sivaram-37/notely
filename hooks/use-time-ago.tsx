import { useState, useEffect } from "react";
import { parse, differenceInSeconds } from "date-fns";

export default function useTimeAgo(dateStr: string) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!dateStr) return;

    // Parse format: MM-dd-yyyy
    const date = parse(dateStr, "MM-dd-yyyy", new Date());

    const updateTime = () => {
      const seconds = differenceInSeconds(new Date(), date);

      if (seconds < 5) return setTimeAgo("just now");
      if (seconds < 60) return setTimeAgo(`${seconds}s ago`);

      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return setTimeAgo(`${minutes}min ago`);

      const hours = Math.floor(minutes / 60);
      if (hours < 24) return setTimeAgo(`${hours}h ago`);

      const days = Math.floor(hours / 24);
      if (days < 30) return setTimeAgo(`${days}d ago`);

      const months = Math.floor(days / 30);
      if (months < 12) return setTimeAgo(`${months}mon ago`);

      const years = Math.floor(months / 12);
      return setTimeAgo(`${years}y ago`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10 * 1000);
    return () => clearInterval(interval);
  }, [dateStr]);

  return timeAgo;
}
