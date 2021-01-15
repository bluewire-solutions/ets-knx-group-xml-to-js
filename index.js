/**
 * ets-knx-group-xml-to-js
 * (C) 2020-2021 bluewire.solutions GmbH & Co. KG, Tobias Hocke
 */

const xml2js = require('xml2js')
const fs = require('fs')

class Ets2Js {
  constructor (Filename) {
    this.filename = Filename
  }

  async getGroupsFromFile (Filename) {
    this.filename = Filename
    const groupXml = await fs.promises.readFile(this.filename)
    return this.getGroupsFromXml(groupXml)
  }

  async getGroupsFromXml (Xml) {
    const parser = new xml2js.Parser()
    const groupJs = await parser.parseStringPromise(Xml)

    let groups = []

    // Validation
    if (typeof groupJs['GroupAddress-Export'] !== 'undefined') {
      if (groupJs['GroupAddress-Export'].$.xmlns === 'http://knx.org/xml/ga-export/01') {
        if (typeof groupJs['GroupAddress-Export'].GroupRange !== 'undefined') {
          groups = this.getGroupAdresses(groupJs['GroupAddress-Export'].GroupRange)
        }
      } else {
        console.warn('invalid xmlns')
      }
    }
    return groups
  }

  getGroupAdresses (GroupRange) {
    let groups = []

    for (let i = 0; i < GroupRange.length; i++) {
      if (typeof GroupRange[i].GroupAddress !== 'undefined') {
        const GroupAddress = GroupRange[i].GroupAddress
        for (let j = 0; j < GroupAddress.length; j++) {
          if (typeof GroupAddress[j].$ === 'object') {
            groups.push(GroupAddress[j].$)
          }
        }
      }
      if (typeof GroupRange[i].GroupRange !== 'undefined') { // dig deeper into nested groups
        const subgroups = this.getGroupAdresses(GroupRange[i].GroupRange)
        groups = groups.concat(subgroups)
      }
    }

    return groups
  }
}

module.exports = new Ets2Js()
