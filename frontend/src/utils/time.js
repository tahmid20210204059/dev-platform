const minuteInMilliseconds = 60 * 1000;
const hourInMilliseconds = 60 * minuteInMilliseconds;
const dayInMilliseconds = 24 * hourInMilliseconds;
const weekInMilliseconds = 7 * dayInMilliseconds;

export const formatTimeAgo = date => {
    const timestamp = new Date(date);

    if (Number.isNaN(timestamp.getTime())) {
        return "Unknown time";
    }

    const difference = Math.max(0, Date.now() - timestamp.getTime());

    if (difference < minuteInMilliseconds) {
        return "Just now";
    }

    if (difference < hourInMilliseconds) {
        const minutes = Math.floor(difference / minuteInMilliseconds);
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    if (difference < dayInMilliseconds) {
        const hours = Math.floor(difference / hourInMilliseconds);
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    if (difference < weekInMilliseconds) {
        const days = Math.floor(difference / dayInMilliseconds);
        return days === 1 ? "Yesterday" : `${days} days ago`;
    }

    return timestamp.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};
