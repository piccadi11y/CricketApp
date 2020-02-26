class Bowler {
  constructor (nameIn, teamIn) {
    this.name = nameIn
    this.team = teamIn

    this.runsAgainst = 0
    this.runsAgainst_bowler = 0
    this.runsAgainst_extras_legbye = 0
    this.runsAgainst_extras_wide = 0

    log.add_bowler(this.name, this.team.name)
  }

  toString () {
    return this.runsAgainst == 1 ? `${this.name} - ${this.runsAgainst} run scored against.` : `${this.name} - ${this.runsAgainst} runs scored against.`
  }

  add_runsAgainst_bowler (r) {
    this.runsAgainst += r
    this.runsAgainst_bowler += r
    this.team.addRuns_against(r)
  }

  add_runsAgainst_extra (q, t) {
    switch (t) {
      case 'legbye': {
        this.runsAgainst_extras_legbye += q
        this.runsAgainst += q
        break
      }
      case 'wide': {
        this.runAgainst_extras_wide += q
        this.runsAgainst += q
        break
      }
      default: break
    }
    this.team.addExtras_against(q, t)
  }
}
