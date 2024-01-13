import { Box } from "@mui/material";
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

// colours for bar stacks
const colours = ["#278c53", "#a2a3a3", "#c7442a"];

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

  // creates custom tooltip for hovering over bars
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      let a = payload.length;
      let message = "";
      for (let i = 0; i < a; i++) {
        message += barKeyNames[i] + ": " + payload[i].value + " ";
      }
      return (
        <Box className="custom-tooltip">
          <p className="intro">
            <b>{` ${label} `}</b> <br></br>
            {`${message}`}
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
            {barKeys.map((barKey) => (
              <Bar
                name={barKeyNames[barKeys.indexOf(barKey)]}
                dataKey={barKey}
                fill={colours[barKeys.indexOf(barKey)]}
                stackId={"a"}
                activeBar={<Rectangle fillOpacity={0.5} stroke="#290e40" />}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default BarGraph;
