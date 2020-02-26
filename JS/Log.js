const log_level_all = 'ALL'
const log_level_error = 'ERROR'
const log_level_warning = 'WARNING'
const log_level_information = 'INFORMATION'

const log_type_all = 1
const log_type_batter = 1.1
const log_type_bowler = 1.2
const log_type_controller = 1.3
const log_type_delivery = 1.4
const log_type_match = 1.5
const log_type_team = 1.6
const log_type_wicket = 1.7
const log_type_inning = 1.8
const log_type_other = 1.9

const debugging = false

class Log {
  constructor () {
    this.logs_batter = []
    this.logs_bowler = []
    this.logs_controller = []
    this.logs_delivery = []
    this.logs_match = []
    this.logs_team = []
    this.logs_wicket = []
    this.logs_inning = []
    this.logs_other = []
  }

    // all logs should allow for a message to be added, to be displayed when 'info, if nothing else is being passed in for 'info' level event

  add_batter (nameIn, teamIn, messageIn = '', levelIn = log_level_information) {
    var batter = {
      message: messageIn,
      level: levelIn,
      name: nameIn,
      team: teamIn,
      out () {
        if (messageIn == '') return String(`BATTER::${this.level}: ${this.name} has been added to ${this.team}`)
        if (messageIn != '') return String(`BATTER::${this.level}: ${this.message}`)
      }
    }
    this.logs_batter.push(batter)
    if (debugging) console.log('Log type [BATTER] has been added.')
  }

  add_bowler (nameIn, teamIn, messageIn = '', levelIn = log_level_information) {
    var bowler = {
      message: messageIn,
      level: levelIn,
      name: nameIn,
      team: teamIn,
      out () {
        if (messageIn == '') return String(`BOWLER::${this.level}: ${this.name} has been added to ${this.team}`)
        if (messageIn != '') return String(`BOWLER::${this.level}: ${this.message}`)
      }
    }
    this.logs_bowler.push(bowler)
    if (debugging) console.log('Log type [BOWLER] has been added.')
  }

  add_controller (messageIn, levelIn = log_level_information) {
    var controller = {
      level: levelIn,
      message: messageIn,
      out () {
        return String(`CONTROLLER::${this.level}: ${this.message}`)
      }
    }
    this.logs_controller.push(controller)
    if (debugging) console.log('Log type [CONTROLLER] has been added.')
  }

  add_delivery (type, messageIn = '', levelIn = log_level_information) {
    var delivery = {
      level: levelIn,
      message: messageIn,
      typeToAdd: type,
      out () {
        if (this.message == '') return String(`DELIVERY::${this.level}: Need to add extra of type ${this.typeToAdd}`)
        if (this.message != '') return String(`DELIVERY::${this.level}: ${this.message}`)
      }
    }
    this.logs_delivery.push(delivery)
    if (debugging) console.log('Log type [DELIVERY] has been added.')
  }

  add_match (messageIn, levelIn = log_level_information) {
    var match = {
      level: levelIn,
      message: messageIn,
      out () {
        return String(`MATCH::${this.level}: ${this.message}`)
      }
    }
    this.logs_match.push(match)
    if (debugging) console.log('Log type [MATCH] has been added.')
  }

  add_team (messageIn, levelIn = log_level_information) {
    var team = {
      level: levelIn,
      message: messageIn,
      out () {
        return String(`TEAM::${this.level}: ${this.message}`)
      }
    }
    this.logs_team.push(team)
    if (debugging) console.log('Log type [TEAM] has been added.')
  }

  add_wicket (type, messageIn = '', levelIn = log_level_information) {
    var wicket = {
      level: levelIn,
      message: messageIn,
      typeToAdd: type,
      out () {
        if (this.message == '') return String(`WICKET::${this.level}: Need to add wicket of type: ${this.typeToAdd}`)
        if (this.message != '') return String(`WICKET::${this.level}: ${this.message}`)
      }
    }
    this.logs_wicket.push(wicket)
    if (debugging) console.log('Log type [WICKET] has been added.')
  }

  add_inning (messageIn, levelIn = log_level_information) {
    var inning = {
      level: levelIn,
      message: messageIn,
      out () {
        return String(`INNING::${this.level}: ${this.message}`)
      }
    }
    this.logs_inning.push(inning)
    if (debugging) console.log('Log type [INNING] has been added.')
  }

  add_other (messageIn, levelIn = log_level_information) {
    var other = {
      level: levelIn,
      message: messageIn,
      out () {
        return String(`OTHER::${this.level}: ${this.message}`)
      }
    }
    this.logs_other.push(other)
    if (debugging) console.log('Log type [OTHER] has been added.')
  }

  get_logs (type, level, download = 0) {
    let logs = []
    switch (type) {
      case log_type_all: {
        logs = logs.concat(this.logs_batter).concat(this.logs_bowler).concat(this.logs_controller).concat(this.logs_delivery).concat(this.logs_match).concat(this.logs_team).concat(this.logs_wicket).concat(this.logs_other)
        break
      }
      case log_type_batter: {
        if (this.logs_batter.length > 0) logs = logs.concat(this.logs_batter)
        break
      }
      case log_type_bowler: {
        if (this.logs_bowler.length > 0) logs = logs.concat(this.logs_bowler)
        break
      }
      case log_type_controller: {
        if (this.logs_controller.length > 0) logs = logs.concat(this.logs_controller)
        break
      }
      case log_type_delivery: {
        if (this.logs_delivery.length > 0) logs = logs.concat(this.logs_delivery)
        break
      }
      case log_type_match: {
        if (this.logs_match.length > 0) logs = logs.concat(this.logs_match)
        break
      }
      case log_type_team: {
        if (this.logs_team.length > 0) logs = logs.concat(this.logs_team)
        break
      }
      case log_type_wicket: {
        if (this.logs_wicket.length > 0) logs = logs.concat(this.logs_wicket)
        break
      }
      case log_type_inning: {
        if (this.logs_inning.length > 0) logs = logs.concat(this.logs_inning)
        break
      }
      case log_type_other: {
        if (this.logs_other.length > 0) logs = logs.concat(this.logs_other)
        break
      }
      default: break
    }

    let out = ''

    for (let i = 0; i < logs.length; i++) {
      if (level == log_level_all) out += logs[i].out() + '\n'
      else if (logs[i].level == level) out += logs[i].out() + '\n'
    }

    if (out != '') {
      if (download) {
        let output = new Blob([out], {type: 'text/plain'})
        let url = window.URL.createObjectURL(output)

        let element = document.createElement('a')
        element.setAttribute('href', url)
        element.setAttribute('download', 'log.txt')
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      } else console.log(out)
    }
  }
}
