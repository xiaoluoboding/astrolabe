import DS from './ds'
let ds = new DS()
let connect = ds.init()
let user = connect.user

export default {
  addUser (userData, callback) {
    userData._id = userData.id
    user.insert(userData, (err, docs) => {
      if (err) {
      }
      return callback(docs)
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
  updateUser (userData) {
    user.update({_id: userData.id}, {$set: userData}, (err, num) => {
      if (err) {}
    })
  }
}
