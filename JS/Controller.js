class Controller {
  constructor () {
        // constuctor
    this.init_container = document.getElementById('initContainer')
    this.init_modeSelect = document.getElementById('modeSelect')
    this.init_invalidFile = document.getElementById('init_uploadStatus')
    this.viewChanger = document.getElementById('viewChanger')
    this.fileChanger = document.getElementById('fileChanger')
    this.fileChanger_output = document.getElementById('fileChanger_output')
    this.jsonObject
    this.match

    this.fileChanged = false
    this.initialBoot = true
    this.viewFull = undefined

    this.full_container = document.getElementById('fullOutContainer')

    this.text_container = document.getElementById('textOutContainer')
    this.text_collapsibles = document.getElementsByClassName('collapsible')
    this.content_matchInformation = document.getElementById('content_matchInformation')
    this.content_deliveries = document.getElementById('deliveries')
    this.content_team1 = document.getElementById('team1')
    this.content_team1_statistics = document.getElementById('team1_statistics')
    this.content_team1_batters = document.getElementById('team1_batters')
    this.content_team1_bowlers = document.getElementById('team1_bowlers')
    this.content_team2 = document.getElementById('team2')
    this.content_team2_statistics = document.getElementById('team2_statistics')
    this.content_team2_batters = document.getElementById('team2_batters')
    this.content_team2_bowlers = document.getElementById('team2_bowlers')
  }

  init_show () {
    this.init_container.style.visibility = 'visible'
  }
  init_hide () {
    this.init_container.style.visibility = 'hidden'
    this.init_hideModeSelection()
  }

  init_showModeSelection () {
    this.init_modeSelect.style.visibility = 'visible'
    this.init_hideInvalidFile()
  }
  init_hideModeSelection () {
    this.init_modeSelect.style.visibility = 'hidden'
  }

  init_showInvalidFile () {
    this.init_invalidFile.style.visibility = 'visible'
  }
  init_hideInvalidFile () {
    this.init_invalidFile.style.visibility = 'hidden'
  }

  handle_fileChanger (hide = false) {
        // console.log('fc')
    if (this.fileChanger.style.visibility == 'visible' || hide) this.fileChanger.style.visibility = 'hidden'
    else this.fileChanger.style.visibility = 'visible'
  }

  handle_viewChanger (hide = false) {
        // console.log('vc')

    if (this.viewChanger.style.visibility == 'visible' || hide) this.viewChanger.style.visibility = 'hidden'
    else this.viewChanger.style.visibility = 'visible'
  }

  initPage () {
    this.init_show()
    document.getElementById('fileInput_init').addEventListener('change', this.handleFileSelect.bind(this), false)
    document.getElementById('fileInput').addEventListener('change', this.handleFileSelect.bind(this), false)

    for (let i = 0; i < this.text_collapsibles.length; i++) {
      this.text_collapsibles[i].addEventListener('click', function () {
        this.classList.toggle('active')
        let content = this.nextElementSibling
        if (content.style.display === 'block') content.style.display = 'none'
        else content.style.display = 'block'

                /* if (content.style.maxHeight) content.style.maxHeight = null
                else content.style.maxHeight = content.scrollHeight + 'px' */
      })
    }
  }

  initMatch () {
        // console.log(this)
    this.match = new Match(this.jsonObject)
        // console.log(this.jsonObject)
        // console.log(this)
  }

  initialisePage_FULL () {
    console.log('full called')
    if (this.initialBoot) {
      this.initialBoot = false
      this.init_hide()
    }
        // log.add_controller('We have made it to full', log_level_information)
        /* if (this.fileChanged) {
            log.add_controller('We have made it to \'Full\'')
            this.initMatch()
        } */

    let fC_temp = this.fileChanged

    if (this.fileChanged) {
      this.initMatch()
      console.log('full created')
      this.fileChanged = false
    }

    if (this.viewFull != true || fC_temp == true) {
      this.viewFull = true
      log.add_controller('Changed to \'Full\'')
      console.log('full refreshed')

      this.text_container.style.display = 'none'
      this.full_container.style.display = 'block'
            // use the match to populate defaults
    }
  }

  initialisePage_TEXT () {
    console.log('text called')
    if (this.initialBoot) {
      this.initialBoot = false
      this.init_hide()
    }
        // log.add_controller('We have made it to text', log_level_information)
        /* if (this.fileChanged) {
            log.add_controller('We have made it to \'Text\'')
            this.initMatch()
        } */

    let fC_temp = this.fileChanged

    if (this.fileChanged) {
      console.log('text created')
      this.initMatch()
      this.fileChanged = false
    }

    if (this.viewFull != false || fC_temp == true) {
      this.viewFull = false
      log.add_controller('Changed to \'Text\'')
      console.log('text refreshed')

      this.full_container.style.display = 'none'
      this.text_container.style.display = 'block'
            // use the match to populate the page

      let team1 = this.match.teams[0]
      let team2 = this.match.teams[1]

      this.content_matchInformation.innerHTML = this.match
      this.content_deliveries.innerHTML = this.match.getInnings()
      this.content_team1.innerHTML = team1
      this.content_team1_statistics.innerHTML = team1.getStatistics()
      this.content_team1_batters.innerHTML = team1.getBatters()
      this.content_team1_bowlers.innerHTML = team1.getBowlers()
      this.content_team2.innerHTML = team2
      this.content_team2_statistics.innerHTML = team2.getStatistics()
      this.content_team2_batters.innerHTML = team2.getBatters()
      this.content_team2_bowlers.innerHTML = team2.getBowlers()
    }
  }

  handleFileSelect (evt) {
    console.log('file uploaded: ' + evt.target.files[0].name)
    let controller = this
    let extensionRegex = /\.[0-9a-z]+$/i
    let fileName = evt.target.files[0].name
    let fileExt = evt.target.files[0].name.match(extensionRegex)

    if (fileExt == '.yaml' || fileExt == '.json') {
      this.fileChanged = true
      let fr = new FileReader()

      if (this.initialBoot) this.init_showModeSelection()
      fr.onload = function (x) {
        let temp
        if (fileExt == '.yaml') temp = YAML.parse(x.target.result)
        if (fileExt == '.json') temp = x.target.result

        if (temp.innings != undefined) {
          controller.jsonObject = temp
          if (!controller.initialBoot) {
            controller.fileChanger_output.innerHTML = ''
            if (controller.viewFull) controller.initialisePage_FULL()
            else controller.initialisePage_TEXT()
          }
          controller.handle_fileChanger(true)
        } else {
          if (controller.initialBoot) {
            controller.init_showInvalidFile()
            controller.init_invalidFile.innerHTML = `${fileName} doesn't contain the necessary data. Please try another file.`
            controller.init_hideModeSelection()
          } else {
                        // code to control the text and buttons in the control bar
            controller.fileChanger_output.innerHTML = `${fileName} doesn't contain the necessary data. Please try another file.`
          }
        }
                /* console.log(controller.jsonObject)
                console.log(controller) */
      }

      fr.readAsText(evt.target.files[0])
    } else {
      this.fileChanged = false
      if (this.initialBoot) {
        this.init_showInvalidFile()
        this.init_invalidFile.innerHTML = `${fileExt} is an invalid file type. Valid types are: .yaml and .json`
        this.init_hideModeSelection()
      } else {
        this.fileChanger_output.innerHTML = `${fileExt} is an invalid file type. Valid types are: .yaml and .json`
      }
    }
  }
}

var log = new Log()
var ctrl = new Controller()
