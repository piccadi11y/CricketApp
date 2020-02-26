class Delivery {
    // don't forget to ask for (and store) the over it belongs to
    // extras get credited to the team total, not to the

  constructor (deliveryID, overIn, batsmanIn, bowlerIn, nBatsmanIn, bRunsIn, extrasIn = undefined, wicketIn = undefined) {
    this.id = deliveryID
    this.over = overIn
    this.batsman = batsmanIn
    this.bowler = bowlerIn
    this.nBatsman = nBatsmanIn
    this.batsman_runs = bRunsIn
    this.extra_type = ''
    this.extra_runs = this.handleExtras(extrasIn)
    this.wicket = this.handleWicket(wicketIn)

    this.addStats()

    log.add_delivery(undefined, `Delivery ${this.over.id} has been created.`)
        // console.log(this.batsman_runs)
  }

  toString () {
        /* return `${this.over.id}.${this.id}: ${this.bowler} bowls for ${this.batsman}.` + this.wicket == undefined ? `A total of ${this.batsman_runs + this.extra_runs} runs was scored.` : this.wicket */
        // return 'hillo'
    let result = `.:: ${this.over.id}.${this.id} ::. ${this.bowler.name} bowls for ${this.batsman.name}.`
    result += this.batsman_runs + this.extra_runs == 1 ? ` A total of 1 run was scored.` : ` A total of ${this.batsman_runs + this.extra_runs} runs were scored.`
    if (this.wicket) result += `<br>---- ${this.wicket} ----`
    return result
  }

  handleWicket (w) {
    if (w) {
      return new Wicket(this, w.kind, w.player_out, w.fielders)
    }
    return undefined
  }

  handleExtras (e) {
    if (e) {
      let eN = Object.getOwnPropertyNames(e)[0]
            // console.log(eN)
      switch (String(eN)) {
        case 'legbyes': this.extra_type = 'legbye'; break
        case 'wides': this.extra_type = 'wide'; break
        default: log.add_delivery(eN)
      }

            // console.log(e[eN])
      if (this.extra_type != '') return parseInt(e[eN], 10)
    }

    return 0
  }

  addStats () {
    if (this.batsman_runs > 0) {
            /* console.log(this.batsman.name)
            console.log(this.batsman_runs) */
      this.batsman.add_runs(this.batsman_runs)
      this.bowler.add_runsAgainst_bowler(this.batsman_runs)
    }
    if (this.wicket) this.batsman.add_wicket(this.wicket)
    if (this.extra_runs > 0) {
      this.batsman.get_team().addExtras(this.extra_runs, this.extra_type)
      this.bowler.add_runsAgainst_extra(this.extra_runs, this.extra_type)
    }
  }
}
