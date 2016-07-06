import jetpack from 'fs-jetpack'
import fs from 'fs'
import DataStore from 'nedb'
import { remote } from 'electron'

export default class {
  constructor () {
    this.db = null
    this.userDataDir = jetpack.cwd(remote.app.getPath('userData'))
  }

  createOrReadDatabase (dbname) {
    let haveUser = fs.existsSync(this.userDataDir.path(dbname.user))
    if (haveUser) {
      let userData = fs.readFileSync(this.userDataDir.path(dbname.user))
      let database = {}

      if (!userData) {
        return
      }

      database.user = new DataStore({
        filename: this.userDataDir.path(dbname.user),
        autoload: true
      })
      return database
    } else {
      try {
        this.userDataDir.write(dbname.user)

        let database = {}

        database.user = new DataStore({
          filename: this.userDataDir.path(dbname.user),
          autoload: true
        })
        return database
      } catch (e) {
        console.log(e)
      }
    }
  }

  init () {
    if (this.db) {
      return this.db
    }
    this.db = this.createOrReadDatabase({
      'user': 'user.db'
    })
    return this.db
  }
}
