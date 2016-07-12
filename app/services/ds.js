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
    let haveRepo = fs.existsSync(this.userDataDir.path(dbname.repo))

    if (haveUser && haveRepo) {
      let userData = fs.readFileSync(this.userDataDir.path(dbname.user))
      let repoData = fs.readFileSync(this.userDataDir.path(dbname.repo))

      let database = {}

      if (!userData && !repoData) {
        return
      }

      database.user = new DataStore({
        filename: this.userDataDir.path(dbname.user),
        autoload: true
      })
      database.repo = new DataStore({
        filename: this.userDataDir.path(dbname.repo),
        autoload: true
      })
      return database
    } else {
      try {
        this.userDataDir.write(dbname.user)
        this.userDataDir.write(dbname.repo)

        let database = {}

        database.user = new DataStore({
          filename: this.userDataDir.path(dbname.user),
          autoload: true
        })
        database.repo = new DataStore({
          filename: this.userDataDir.path(dbname.repo),
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
      'user': 'users.db',
      'repo': 'repos.db'
    })
    return this.db
  }
}
