import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { Box } from "@mui/material";
import logo from "./assets/logo.png";
import Data from "./components/Data";

// place api-key as string here
const key = "";

var seasonList: any;
var hasSeasons = false;
let allData = new Array<any>();

function App() {
  var [seasons, setSeasons] = useState([0]);
  var [teams, setTeams] = useState(new Array<any>());
  var [standingsData, setStandingsData] = useState(new Array<any>());
  var [statisticsData, setStatisticsData] = useState(new Array<any>());

  // get data from link
  function get(link: string) {
    return fetch(link, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": key,
      },
    });
  }

  // gets list of Premier League teams from a given season
  function getTeams(season: any) {
    var link =
      "https://v3.football.api-sports.io/teams?league=39&season=" +
      season.substring(0, 4);
    console.log("Link: " + link);
    get(link)
      .then((response) => {
        response.json().then((x) => {
          var teamList = x.response;
          setTeams(teamList);
          getStandings(season);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // get standings for selected season
  function getStandings(season: any) {
    var link =
      "https://v3.football.api-sports.io/standings?league=39&season=" +
      season.substring(0, 4);
    get(link)
      .then((response) => {
        response.json().then((x) => {
          let standings = x.response[0].league.standings[0];
          console.log(standings);
          setStandingsData(standings);
          getStatistics(season, standings);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // get statistics for selected season
  function getStatistics(season: any, standings: any) {
    for (let i = 0; i < 10; i++) {
      // for (let i = 0; i < 5; i++) {
      setTimeout(function () {
        var link =
          "https://v3.football.api-sports.io/teams/statistics?league=39&season=" +
          season.substring(0, 4) +
          "&team=" +
          standings[i].team.id;
        get(link)
          .then((response) => {
            response.json().then((x) => {
              let stats = x.response;
              allData[i] = stats;
              if (i == 9) {
                setStatisticsData(allData.slice());
                console.log(allData);
                setStats(allData);
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }, 75);
    }
  }

  // sets statistics value to data
  function setStats(data: any[]) {
    const a = data;
    setStatisticsData(a);
    console.log(a);
  }

  // gets seasons from API
  if (hasSeasons == false) {
    get("https://v3.football.api-sports.io/leagues/seasons")
      .then((response) => {
        hasSeasons = true;
        response.json().then((x) => {
          seasonList = x.response;
          console.log(seasonList);
          if (x.response.length != 0) {
            setSeasons(x.response);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // maps years to their season names (e.g. 2023 --> 2023-2024)
  function mapSeason(x: any) {
    if (x == 0) {
      return "";
    } else {
      return x + " - " + (Number(x) + 1);
    }
  }

  // removes seasons that are out of range
  function seasonRange(x: number[]) {
    var range = [];
    for (let i = 0; i < x.length; i++) {
      if (x[i] < 2024) {
        range.push(x[i]);
      }
    }
    return range;
  }

  // gives alert if API limit not reached
  function apiError() {
    alert(
      "You have not connected with the API. Check if you reached your API request limit or if the API is down."
    );
  }

  // return statement
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <img src={logo} style={{ width: "75px" }}></img>
        <>
          <h2>Premier League Visualizer</h2>
        </>
      </Box>
      <Box
        sx={{
          backgroundColor: "#c8b3e3",
          margin: "auto",
          width: "95vw",
          minHeight: "80vh",
          marginLeft: "2vw",
          marginTop: "1vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SearchBar
          options={seasonRange(seasons).map(mapSeason)}
          onClick={(x) => {
            console.log(x + " AAAA");
            getTeams(x);
          }}
        ></SearchBar>
        <Data standings={standingsData} statistics={statisticsData}></Data>
      </Box>
    </>
  );
}

export default App;
