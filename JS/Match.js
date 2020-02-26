class Match {
  constructor (dataIn) {
    this.data = dataIn

    this.city
    this.dates = []
    this.gender
    this.matchType
    this.neutralVenue
    this.outcome
    this.overs
    this.mvp
    this.toss
    this.umpires = []
    this.venue

    this.teams = []
    this.innings = []

    log.add_match('Match Created', log_level_information)
    console.log(this.data)

    this.init()

    console.log(this.teams)
  }

  toString () {
    console.log(this)
    let out = ''
        // use this code here for dealing with the outcome
        /* let str = JSON.stringify(this.data.info.outcome.by)
        let x = str.match(/[a-z]+/i)[0]
        console.log(x) */

        // remember to conver 'neutralVenue' into a boolean before printing out in any for, or at least remember that it's a boolean stored as an int

    if (this.city) out += `City: ${this.city}<br>`
    if (this.dates) {
      let temp = ''
      let days = this.dates.length
      let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
      if (days > 1) {
        temp = `The game ran from ${this.dates[0].toLocaleDateString('default', options)} to ${this.dates[days - 1].toLocaleDateString('default', options)}, for a total of ${days} days.`
            // } else temp = this.dates[0].toLocaleDateString()
      } else temp = `The game was played on ${this.dates[0].toLocaleDateString('default', options)}`
      out += `Match's ${days > 1 ? 'dates' : 'date'}: ${temp}<br>`
    }
    if (this.gender) out += `Gender of Players: ${this.gender.charAt(0).toUpperCase() + this.gender.slice(1)}<br>`
    if (this.matchType) out += `Match Type: ${this.matchType}<br>`
    if (this.neutralVenue) out += `Neutral Venue: ${this.neutralVenue ? 'Yes' : 'No'}<br>`
    if (this.outcome) {
      let byOG = JSON.stringify(this.outcome.by)
      let by = byOG.match(/[a-z]+/i)[0]
      out += `Winner: ${this.outcome.winner} won by ${this.outcome.by[by]} ${by}.<br>`
    }
    if (this.overs) out += `Number of Overs per Inning: ${this.overs}<br>`
    if (this.mvp) out += `Player of the Match: ${this.mvp}<br>`
    if (this.toss) out += `The toss was won by: ${this.toss.winner}, they chose to ${this.toss.decision} first.<br>`
    if (this.umpires.length > 0) {
      let temp = ''
      let len = this.umpires.length
      if (len > 1) {
        for (let i = 0; i < len - 1; i++) temp += `${this.umpires[i]}, `
        temp = temp.slice(0, -2) + ` and ${this.umpires[len - 1]}`
        out += `The match's umpires: ${temp}<br>`
      } else out += `The match's umpire: ${this.umpires[0]}<br>`
    }
    if (this.venue) out += `The match's venue: ${this.venue}<br>`

    return out
  }

  findTeam (name, batting) {
    let out
    if (batting) out = this.teams[0].name == name ? this.teams[0] : this.teams[1]
    else if (!batting) out = this.teams[0].name != name ? this.teams[0] : this.teams[1]
    return out
  }

  init_var (variable) {
    if (this.data.info[variable] != undefined) return this.data.info[variable]
    else log.add_match(`No ${variable.toUpperCase()} found.`, log_level_warning)
    return undefined
  }

  init_teams () {
    let teamNames = this.data.info.teams
    for (let i = 0; i < teamNames.length; i++) {
      this.teams.push(new Team(teamNames[i]))
    }
  }

  init_innings () {
    let innings = this.data.innings
    let inningNames = []
    for (let i = 0; i < innings.length; i++) inningNames.push((Object.getOwnPropertyNames(innings[i]))[0])
    for (let i = 0; i < innings.length; i++) {
            // console.log(innings[i][inningNames[i]])
      let data = innings[i][inningNames[i]]
            // at some point make this its own function, and all the others for that matter, to keep teach happy
      this.innings.push(new Inning(i, data.deliveries, this.findTeam(data.team, true), this.findTeam(data.team, false)))
    }
        /* console.log(inningNames)
        console.log(innings) */
        // console.log(this.innings)
  }

  init_umpires () {
    let umps = this.data.info.umpires

    if (umps != undefined) for (let i = 0; i < umps.length; i++) this.umpires.push(new Umpire(umps[i]))
    else log.add_match('No umpires found.', log_level_warning)
  }

  init () {
    if (this.data.info != undefined) {
      this.city = this.init_var('city')
      this.dates = this.init_var('dates')
      this.gender = this.init_var('gender')
      this.matchType = this.init_var('match_type')
      this.neutralVenue = this.init_var('neutral_venue')
      this.outcome = this.init_var('outcome')
      this.overs = this.init_var('overs')
      this.mvp = this.init_var('player_of_match')
      this.toss = this.init_var('toss')
      this.venue = this.init_var('venue')
    } else log.add_match('No INFO found.', log_level_error)

        // console.log(this)

    this.init_umpires()
    this.init_teams()
    this.init_innings()
  }

  getInnings () {
    let result = ''
    for (let i in this.innings) {
      result += this.innings[i]
      result += '<br><br>'
    }
    return result
  }
}
