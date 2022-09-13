export class Team {
  constructor(name, date, groupNum) {
    this.name = name;
    this.date = date;
    this.groupNum = groupNum;
    this.loss = 0;
    this.win = 0;
    this.draw = 0;
    this.goals = 0;
  }

  addLoss() {
    this.loss += 1;
  }

  addWin() {
    this.win += 1;
  }

  addDraw() {
    this.draw += 1;
  }

  getMatchPoints() {
    return 3 * this.win + this.draw;
  }

  getAlternateMatchPoints() {
    return 5 * this.win + 3 * this.draw + this.loss;
  }

  addGoal(goal) {
    this.goals += goal;
  }

  getGoal() {
    return this.goals;
  }

  getDate() {
    return this.date;
  }

  getGroupNum() {
    return this.groupNum;
  }

  reset() {
    this.loss = 0;
    this.win = 0;
    this.draw = 0;
    this.goals = 0;
  }
}
