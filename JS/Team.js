class Team {
  constructor (teamName) {
    this.name = teamName

    this.bowlers = []
    this.batters = []

    this.battersOut = 0
    this.runs = 0
    this.runs_extras_wide = 0
    this.runs_extras_legbye = 0
    this.runs_batters = 0

    this.runsAgainst = 0
    this.runsAgainst_extras_wide = 0
    this.runsAgainst_extras_legbye = 0

    log.add_team(`Team '${this.name}' has been created.`)
  }

  toString () {
    return this.name
  }

  addBatter (name) {
    let b = new Batter(name, this)
    this.batters.push(b)
    return b
  }

  getBatter (name) {
    for (let i = 0; i < this.batters.length; i++) if (this.batters[i].name == name) return this.batters[i]
    return this.addBatter(name)
  }

  addBowler (name) {
    let b = new Bowler(name, this)
    this.bowlers.push(b)
    return b
  }

  getBowler (name) {
    for (let i = 0; i < this.bowlers.length; i++) if (this.bowlers[i].name == name) return this.bowlers[i]
    return this.addBowler(name)
  }

  batterOut () {
    this.battersOut++
  }

  addExtras (q, t) {
        // console.log(t)
    switch (t) {
      case 'legbye': {
        this.runs_extras_legbye += q
        this.runs += q
        break
      }
      case 'wide': {
        this.runs_extras_wide += q
        this.runs += q
        break
      }
      default: break
    }
  }

  addRuns (r) {
    this.runs_batters += r
    this.runs += r
  }

  addExtras_against (q, t) {
    switch (t) {
      case 'legbye': {
        this.runsAgainst_extras_legbye += q
        break
      }
      case 'wide': {
        this.runsAgainst_extras_wide += q
        break
      }
      default: break
    }
  }

  addRuns_against (r) {
    this.runsAgainst += r
  }

  getBatters () {
    let result = ''
    for (let i in this.batters) {
      result += this.batters[i]
      result += '<br>'
    }
    return result
  }

  getBowlers () {
    let result = ''
    for (let i in this.bowlers) {
      result += this.bowlers[i]
      result += '<br>'
    }
    return result
  }

  getStatistics () {
    return `Runs for: ${this.runs}<br>Runs against: ${this.runsAgainst}<br>Batsmen out: ${this.battersOut}`
  }
}
