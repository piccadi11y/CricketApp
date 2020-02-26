class Batter {
  constructor (nameIn, teamIn) {
    this.name = nameIn
    this.team = teamIn

    this.runs = 0
    this.wicket = undefined

    log.add_batter(this.name, this.team.name)
  }

  toString () {
    return this.runs == 1 ? `${this.name} - ${this.runs} run scored.` : `${this.name} - ${this.runs} runs scored.`
  }

  add_runs (r) {
    this.runs += r
    this.team.addRuns(r)
  }

  add_wicket (w) {
    this.wicket = w
    this.team.batterOut()
  }

  get_team () {
    return this.team
  }
}
