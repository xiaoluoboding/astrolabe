// import * as types from './mutation-types'
// export const setToken = ({ dispatch }, token) => {
//   dispatch(types.SET_TOKEN, token)
// }

// global actions
export const changeTheme = makeAction('CHANGE_THEME')
export const increaseLimit = makeAction('INCREASE_LIMIT')

// login actions
export const toggleConnecting = makeAction('TOGGLE_CONNECTING')
export const toggleLoading = makeAction('TOGGLE_LOADING')
export const toggleLogin = makeAction('TOGGLE_LOGIN')

// github actions
export const setToken = makeAction('SET_TOKEN')
export const setGithub = makeAction('SET_GITHUB')
export const setUser = makeAction('SET_USER')
export const initRepos = makeAction('INIT_REPOS')
export const setRepos = makeAction('SET_REPOS')
export const setLazyRepos = makeAction('SET_LAZY_REPOS')
export const setLangGroup = makeAction('SET_LANG_GROUP')

// dashboard actions
export const toggleLoadingReadme = makeAction('TOGGLE_LOADING_README')
export const setActiveRepo = makeAction('SET_ACTIVE_REPO')
export const orderRepo = makeAction('ORDER_REPO')

// sidebar actions
export const setSearchQuery = makeAction('SET_SEARCH_QUERY')
export const filterByLanguage = makeAction('FILTER_BY_LANGUAGE')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
