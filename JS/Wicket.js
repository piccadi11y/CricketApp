// https://www.quora.com/How-many-types-of-wickets-are-there-in-cricket

class Wicket {
  constructor (deliveryIn, kindIn, playerIn, fieldersIn = undefined) {
    this.delivery = deliveryIn
    this.kind = this.handleKind(kindIn)
    this.playerOut = playerIn
    this.fielders = fieldersIn

        // console.log(this)
    log.add_wicket(undefined, 'Wicket created')
  }

  toString () {
    return `Wicket | Player Out: ${this.playerOut} | Out by: ${this.kind}`
  }

  handleKind (k) {
    switch (String(k)) {
      case 'lbw': return 'Leg Before Wicket'
      case 'caught': return 'Caught'
      case 'bowled': return 'Bowled'
      case 'stumped': return 'Stumped'
      default: log.add_wicket(k)
    }
    return k
  }
}
