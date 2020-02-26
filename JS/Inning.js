class Inning {
  constructor (inningId, dataIn, battingTeam, fieldingTeam) {
    this.id = inningId
    this.data = dataIn
    this.bT = battingTeam
    this.fT = fieldingTeam

    this.overs = []
    log.add_inning(`The inning with ${this.bT.name} batting has been created.`)

        // console.log(this.data)
    this.init()
        // console.log(`Here is inning ${this.id}`)
        // console.log(this)
  }

  toString () {
    let result = `Inning ${this.id + 1}:<br><br>`
    for (let i in this.overs) {
      let d = this.overs[i].deliveries
      for (let x in d) {
        result += d[x]
        result += '<br>'
      }
    }
        // result += '<br><br>'
    return result
  }

  init () {
        // console.log(this.data[0]['0.1'])
    let deliveryNumbers = []
    for (let i = 0; i < this.data.length; i++) deliveryNumbers.push(Object.getOwnPropertyNames(this.data[i]))
        // console.log(this.data[0][deliveryNumbers[0]])
        // this code gets the [over.delivery] starting at 1 (for the over at least, del already starts at 1)
        // console.log(parseFloat(deliveryNumbers[0]))

        // console.log(deliveryNumbers)
    let ovr_current = 0
    let ovr = new Over(ovr_current)

    let delivery_current = 0

    for (let i = 0; i < this.data.length; i++) {
      let dData = this.data[i][deliveryNumbers[i]]
            // console.log(parseInt(deliveryNumbers[i]))
      let batsman = this.bT.getBatter(dData.batsman), bowler = this.fT.getBowler(dData.bowler), nBatsman = this.bT.getBatter(dData.non_striker)
            // if (batter && bowler)
            // console.log(ovr_current)
      if (parseInt(deliveryNumbers[i]) > ovr_current) {
        this.overs.push(ovr)
        ovr = new Over(parseInt(deliveryNumbers[i]))
        delivery_current = 0
        ovr_current++
      }
            // console.log(ovr_current)

            // console.log(dData)
      ovr.add_delivery(++delivery_current, batsman, bowler, nBatsman, dData.runs.batsman, dData.extras, dData.wicket)

            // deliveries next                                          - done
                // don't forget wickets                                 - done
            // then add stats to batters and bowlers

            // then we're done with adding everything, yay!
    }
    this.overs.push(ovr)
        // console.log(this.bT)
        // console.log(this.fT)
  }
}
