import dayjs from "dayjs";

export const getCookie = (name) => {
    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                break;
            }
        }
    }

    return cookieValue;
};

// todo This function returen the date range on week given
export const getWeekDateRange = (input) => {
    // Extract year and week number from input (e.g., "2024-44th")
    const [year, weekWithSuffix] = input.split("-");
    const week = parseInt(weekWithSuffix); // Convert week to integer, ignoring suffix

    const date = new Date(year, 0, 1 + (week - 1) * 7);

    // Move to the nearest Thursday to ensure we're in the correct week
    date.setDate(date.getDate() + (4 - date.getDay()));

    // Get the start of the week (Sunday)
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay());

    // Get the end of the week (Saturday)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    // Helper function to format day suffix
    function getDaySuffix(day) {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    // Helper function to format date
    function formatDate(date) {
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        return `${day}${getDaySuffix(day)} ${month} ${year}`;
    }

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};
// Example usage:
// console.log(getWeekDateRange("2024-44th"));

// todo this function return todayes week on iso formate with dayjs
export const getWeekNumberAndYear = () => {
    const dayjs = require("dayjs");
    const weekOfYear = require("dayjs/plugin/weekOfYear");
    dayjs.extend(weekOfYear);

    const now = dayjs();
    const weekNumber = now.startOf("week").day(0).week(); // Week starts on Sunday
    const year = now.year();

    return `${year}-${weekNumber}th`;
};

// todo for week picker range is selcted form here
export const getStartEndDate = () => {
    // getWeekNumberAndYear()
    const today = new Date();
    const eightDaysAgo = new Date(today);

    // Set eight days ago date
    eightDaysAgo.setDate(today.getDate() - 7);

    // Format both dates as YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return {
        end: formatDate(today),
        start: formatDate(eightDaysAgo),
    };
};
