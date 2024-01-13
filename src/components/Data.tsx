import { Box, createTheme } from "@mui/material";
import "./styles.css";
import BarGraph from "./BarGraph";
import SignedBarGraph from "./SignedBarGraph";
import StackedBarGraph from "./StackedBarGraph";

interface Props {
  standings: any[];
  statistics: any[];
}

// colour scheme
const dataTheme = createTheme({
  palette: {
    primary: {
      dark: "#290e40",
      light: "#efe9f5",
      main: "#36204f",
    },
  },
});

// render data (all graphs)
const Data = ({ standings, statistics }: Props) => {
  if (
    standings == null ||
    statistics == null ||
    standings.length == 0 ||
    statistics.length == 0
  ) {
    return <Box sx={{ height: "60vh" }}></Box>;
  }

  return (
    <div className="dataBox">
      <Box
        sx={{
          backgroundColor: dataTheme.palette.primary.light,
          width: "80%",
          maxWidth: "90vw",
          padding: 5,
          paddingTop: 0,
          paddingBottom: 15,
          margin: "auto",
          marginTop: 5,
          border: 0,
        }}
      >
        <BarGraph
          standings={standings}
          title="Standings"
          ylabel="Points"
          barKeys={["points"]}
          barKeyNames={["Points"]}
        ></BarGraph>

        <SignedBarGraph
          standings={standings}
          title="Goal Difference"
          ylabel="Goal difference"
          barKeys={["goalsDiff"]}
          barKeyNames={["Goal Difference"]}
        ></SignedBarGraph>

        <BarGraph
          standings={statistics}
          title="Maximum Win Streak"
          ylabel="Win streak"
          barKeys={["biggest.streak.wins"]}
          barKeyNames={["Streak"]}
        ></BarGraph>

        <StackedBarGraph
          standings={statistics}
          title="Fixture Result Distribution"
          ylabel="Number of games"
          barKeys={[
            "fixtures.wins.total",
            "fixtures.draws.total",
            "fixtures.loses.total",
          ]}
          barKeyNames={["Wins", "Draws", "Losses"]}
        ></StackedBarGraph>

        <StackedBarGraph
          standings={statistics}
          title="Penalties"
          ylabel="Penalties"
          barKeys={["penalty.scored.total", "penalty.missed.total"]}
          barKeyNames={["Scored", "Missed"]}
        ></StackedBarGraph>
      </Box>
    </div>
  );
};

export default Data;
