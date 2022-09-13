import { Team } from "./team.js";

export function processTeamRanking(req, res) {
  try {
    const { rawTeams, rawMatches } = req.body;
    if (rawTeams && rawMatches) {
      console.log(rawTeams);
      const teams = new Map();
      for (const index in rawTeams) {
        const rawTeam = rawTeams[index];
        console.log(rawTeam);
        var teamDetails = rawTeam.split(" ");
        console.log(teamDetails);
        var teamName = teamDetails[0];
        console.log(teamName);
        var registrationDate = new Date();
        console.log(teamDetails[1]);
        registrationDate.setDate(parseInt(teamDetails[1].split("/")[0]));
        registrationDate.setMonth(parseInt(teamDetails[1].split("/")[1]));
        var groupNumber = parseInt(teamDetails[2]);
        var team = new Team(teamName, registrationDate, groupNumber);
        teams.set(teamName, team);
      }
      console.log(teams);

      for (const index in rawMatches) {
        const rawMatch = rawMatches[index];
        var matchDetails = rawMatch.split(" ");
        var nameA = matchDetails[0];
        var nameB = matchDetails[1];
        var scoreA = parseInt(matchDetails[2]);
        var scoreB = parseInt(matchDetails[3]);
        teams.get(nameA).addGoal(scoreA);
        teams.get(nameB).addGoal(scoreB);
        if (scoreA > scoreB) {
          teams.get(nameA).addWin();
          teams.get(nameB).addLoss();
        } else if (scoreA < scoreB) {
          teams.get(nameB).addWin();
          teams.get(nameA).addLoss();
        } else {
          teams.get(nameA).addDraw();
          teams.get(nameB).addDraw();
        }
      }
      console.log("Before ranking");
      console.log(teams);
      console.log("Before ranking");

      var groupARanking = [];
      var groupBRanking = [];
      teams.forEach((team, name) => {
        if (team.getGroupNum() === 1) {
          groupARanking.push(name);
        } else {
          groupBRanking.push(name);
        }
      });
      const sortTeam = function (a, b) {
        var x = teams.get(a);
        var y = teams.get(b);
        if (x.getMatchPoints() != y.getMatchPoints()) {
          return y.getMatchPoints() - x.getMatchPoints();
        }
        if (x.getGoal() != y.getGoal()) {
          return y.getGoal() - x.getGoal();
        }
        if (x.getAlternateMatchPoints() != y.getAlternateMatchPoints()) {
          return y.getAlternateMatchPoints() - x.getAlternateMatchPoints();
        }
        return x.getDate().getTime() - y.getDate().getTime();
      };
      groupARanking.sort(sortTeam);
      groupBRanking.sort(sortTeam);

      return res
        .status(200)
        .json({ groupARanking: groupARanking, groupBRanking: groupBRanking });
    } else {
      console.log(rawMatches);
      console.log(rawTeams);
      return res.status(400).json({
        Message: "Team and/or matches is missing",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error occurred when processing team rankings.",
    });
  }
}
