import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reposSchema = new Schema({
  _id: Number,
  owner_name: String,
  repo_name: String,
  description: String,
  stargazers_count: Number,
  forks_count: Number,
  html_url: String,
  clone_url: String,
  git_url: String,
  downloads_url: String,
  created_at: String,
  updated_at: String,
  language: String
})

const Repos = mongoose.model('T_repo', reposSchema)

export default Repos
