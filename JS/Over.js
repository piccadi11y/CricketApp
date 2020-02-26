class Over {
  constructor (overID) {
    this.id = overID
    this.deliveries = []
  }

  toString () {
    let result = ''
    for (let i in this.deliveries) {
            // result += this.deliveries[i]
      result += '<br>'
    }
    return result
  }

  add_delivery (deliveryID, batsmanIn, bowlerIn, nBatsmanIn, runsIn, extrasIn = undefined, wicketIn = undefined) {
    this.deliveries.push(new Delivery(deliveryID, this, batsmanIn, bowlerIn, nBatsmanIn, runsIn, extrasIn, wicketIn))
  }
}
