import { Text } from "@mantine/core";
import classes from "./StatsGroup.module.css";

const data = [
    {
        title: "Total Incidence",
        stats: "456,133",
        description: "24% more than in thes same month last year, 33% more that two years ago",
    },
    {
        title: "Solved & close",
        stats: "2,175",
        description: "13% less compared to last month, new user engagement up by 6%",
    },
    {
        title: "Satisfied",
        stats: "1,994",
        description: "1994 orders were completed this month, 97% satisfaction rate",
    },
];

export const MonthlyStatisticsCard = () => {
    const stats = data.map((stat) => (
        <div key={stat.title} className={classes.stat}>
            <Text className={classes.count}>{stat.stats}</Text>
            <Text className={classes.title}>{stat.title}</Text>
            <Text className={classes.description}>{stat.description}</Text>
        </div>
    ));
    return <div className={classes.root}>{stats}</div>;
};
