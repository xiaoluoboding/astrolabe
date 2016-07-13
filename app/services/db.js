import DS from './ds'
let ds = new DS()
let connect = ds.init()
let user = connect.user
let repo = connect.repo
let langGroup = connect.langGroup

export default {
  // users.db CRUD
  addUser (userData, callback) {
    userData._id = userData.id
    user.insert(userData, (err, docs) => {
      if (err) {}
      return callback(docs)
    })
  },
  updateUser (userData) {
    user.update({_id: userData.id}, {$set: userData}, (err, num) => {
      if (err) {}
    })
  },
  findOneUser (id) {
    return new Promise((resolve, reject) => {
      user.findOne({_id: id}, (err, doc) => {
        if (err) {}
        return resolve(doc)
      })
    })
  },
  // repos.db CRUD
  addRepo (repoData, callback) {
    repo.insert(repoData, (err, docs) => {
      if (err) {}
      return callback(docs)
    })
  },
  updateRepo (repoData) {
    repo.update({_id: repoData._id}, {$set: repoData}, (err, num) => {
      if (err) {}
    })
  },
  findOneRepo (id) {
    return new Promise((resolve, reject) => {
      repo.findOne({_id: id}, (err, doc) => {
        if (err) {}
        return resolve(doc)
      })
    })
  },
  findRepos () {
    return new Promise((resolve, reject) => {
      repo.find({}, (err, docs) => {
        if (err) {}
        return resolve(docs)
      })
    })
  },
  // langGroup.db CRUD
  addLangGroup (langData, callback) {
    langGroup.insert(langData, (err, docs) => {
      if (err) {}
      return callback(docs)
    })
  }
}
