// vuex/modules/github.js
import {
  SET_TOKEN,
  SET_GITHUB,
  SET_USER,
  INIT_REPOS,
  SET_REPOS
} from '../mutation-types'
import _ from 'lodash'
import db from '../../services/db'

// initial state
const state = {
  token: '',
  github: '',
  user: '',
  repos: [],
  langGroup: []
}

// mutations
const mutations = {
  [SET_TOKEN] (state, token) {
    state.token = token
  },

  [SET_GITHUB] (state, github) {
    state.github = github
  },

  [SET_USER] (state, user) {
    db.findOneUser(user.id).then(doc => {
      if (_.isNull(doc)) {
        db.addUser(user, docs => {
          state.user = docs
          // callback(docs)
        })
      } else {
        db.updateUser(user)
        state.user = user
      }
    })
  },

  [INIT_REPOS] (state, user, repos) {
    // insert t_repos
    let initRepos = []
    let reposArray = []
    for (let i in repos) {
      // console.log(repos[i])
      let t_repo = {
        '_id': repos[i].id,
        'owner_name': repos[i].full_name.split('\/').shift(),
        'repo_name': repos[i].full_name.split('\/').pop(),
        'description': repos[i].description,
        'stargazers_count': repos[i].stargazers_count,
        'forks_count': repos[i].forks_count,
        'html_url': repos[i].html_url,
        'clone_url': repos[i].clone_url,
        'git_url': repos[i].git_url,
        'downloads_url': repos[i].html_url + '/archive/' + repos[i].default_branch + '.zip',
        'created_at': repos[i].created_at,
        'updated_at': repos[i].updated_at,
        'language': repos[i].language == null ? 'null' : repos[i].language
      }
      initRepos.push(t_repo);
      db.findOneRepo(t_repo._id).then(doc => {
        if (_.isNull(doc)) {
          db.addRepo(t_repo)
        } else {
          db.updateRepo(t_repo)
          // state.repos = initRepos
        }
      })
      reposArray.push(repos[i].id)
    }
    console.log('findOneAndUpdate [%d] repos', repos.length)

    let countLangs = _.countBy(initRepos, 'language')

    let langGroup = []
    for (var lang in countLangs) {
      if (countLangs.hasOwnProperty(lang)) {
        let lang_count = {
          '_id': lang,
          'lang': lang,
          'count': countLangs[lang]
        }
        langGroup.push(lang_count)
      }
    }

    console.log(langGroup);

    db.fetchLangGroup().then(groups => {
      if (_.isEmpty(groups)) {
        db.addLangGroup(langGroup, docs => {
          state.langGroup = langGroup
        })
      } else {
        state.langGroup = groups
      }
    })

    // set init repos
    state.repos = initRepos
  },

  [SET_REPOS] (state) {
    db.fetchRepos().then(repos => {
      state.repos = repos
    })
  }
}

export default {
  state,
  mutations
}
