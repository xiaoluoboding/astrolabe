import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userReposSchema = new Schema({
  user_id: Number,
  repos: [],
  lang_group: {
    lang: String,
    count: Number
  }
})

const userRepos = mongoose.model('T_user_repo', userReposSchema)

export default userRepos
