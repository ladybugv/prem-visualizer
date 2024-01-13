import React, { PureComponent } from "react";
import { Box, createTheme } from "@mui/material";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  ReferenceLine,
} from "recharts";

import "./styles.css";

// standings: data array
// title: graph title
// ylabel: y-axis lavel
// barKeys: data keys for each bar
// barKeyNames: labels for tooltip for each bar
interface Props {
  standings: any[];
  title: string;
  ylabel: string;
  barKeys: string[];
  barKeyNames: string[];
}

const BarGraph = ({
  standings,
  title,
  ylabel,
  barKeys,
  barKeyNames,
}: Props) => {
  // return nothing if no data
  if (standings == null || standings.length == 0) {
    return <></>;
  }

  // tooltip layout
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box className="custom-tooltip">
          <p className="intro">
            <b>{` ${label} `}</b> <br></br>
            {`${ylabel}: ${payload[0].value}`}
          </p>
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "90vw",
          height: "400px",
          padding: 5,
          paddingBottom: 5,
          margin: "auto",
          marginTop: 5,
          border: 0,
        }}
      >
        <p className="graphTitle">{title}</p>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={standings}
            margin={{
              top: 0,
              right: 20,
              left: 25,
              bottom: 150,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team.name" angle={-90} tickMargin={80}></XAxis>
            <YAxis>
              <Label value={ylabel} position="left" angle={-90}></Label>
            </YAxis>
            {barKeys.length > 1 ? (
              <Legend verticalAlign="top" height={40} />
            ) : null}
            <Tooltip content={<CustomTooltip></CustomTooltip>} />
            <ReferenceLine y={0} stroke="#000" />
            {barKeys.map((barKey) => (
              <Bar
                name={barKeyNames[barKeys.indexOf(barKey)]}
                dataKey={barKey}
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default BarGraph;
