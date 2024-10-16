import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)` // Styled component for sales chart
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  const allDates = eachDayOfInterval({ // Generate all dates in the interval
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => { // Map dates to sales data
    return {
      label: format(date, "MMM dd"), // Format date for label
      totalSales: bookings // Calculate total sales for the date
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings // Calculate extras sales for the date
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode // Determine colors based on dark mode
    ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}> {/* Render AreaChart with data */}
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }} // Set tick color
            tickLine={{ stroke: colors.text }} // Set tick line color
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }} // Set tick color
            tickLine={{ stroke: colors.text }} // Set tick line color
          />
          <CartesianGrid strokeDasharray="4" /> {/* Render grid */}
          <Tooltip contentStyle={{ backgroundColor: colors.background }} /> {/* Render tooltip */}
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke} // Set stroke color
            fill={colors.totalSales.fill} // Set fill color
            strokeWidth={2}
            name="Total sales" // Set area name
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke} // Set stroke color
            fill={colors.extrasSales.fill} // Set fill color
            strokeWidth={2}
            name="Extras sales" // Set area name
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;