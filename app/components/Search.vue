<script>
  import {
    setSearchQuery
  } from '../vuex/actions'

  export default {
    name: 'Search',

    vuex: {
      getters: {
        searchQuery: ({ sidebar }) => sidebar.searchQuery
      },
      actions: {
        setSearchQuery
      }
    },

    // first way to archive filter repos without v-model
    // methods: {
    //   updateSearchQuery: function(e) {
    //     this.setSearchQuery(e.target.value)
    //   }
    // },

    // sencod way to archive filter repos that can use v-model
    computed: {
      thisSearchQuery: {
        get () {
          return this.searchQuery
        },
        set (val) {
          this.setSearchQuery(val)
        }
      }
    }
  }
</script>
<template>
  <form action="" class="search">
    <!-- // first way to archive filter repos without v-model -->
    <!-- <input class="search-box" type="search" id="search-box" autocomplete="off" :value="searchQuery" @input="updateSearchQuery"> -->
    <!-- // the second way to archive filter repos that can use v-model -->
    <input class="search-box" type="search" id="search-box" autocomplete="off" v-model="thisSearchQuery">
    <label class="search-label" for="search-box"><i class="material-icons medium">search</i></label>
  </form>
</template>
<style media="screen">
  /* border-box */

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  /* Undoes normalize.css setting box-sizing to content-box */

  input[type="search"] {
    box-sizing: border-box;
    /*box-shadow: 0 3px 12px -1px rgba(0, 0, 0, .3);*/
    box-shadow: none;
    border-bottom: none;
    margin: 0;
    padding: 8px 10px;
  }

  .search input[type=search]:focus:not([readonly]) {
    border-bottom: 1px solid #f5f5f5;
    box-shadow: 0 1px 0 0 #f5f5f5;
  }

  .search input[type=search]:focus:not([readonly]) + label {
    color: #fff;
  }
  /**
  * The search field needs to be a little smaller than its container but when
  * focused it needs to grow to the whole width of its container.
  *
  * I wanted the icon to be specified in the html instead of a background so
  * I could use fontawesome.
  *
  * I use flexbox so that the search box grows to the whole width of its
  * container (minus the margins when it's not focused).
  *
  * When the search box is focused the icon moves horizontally the width of the
  * margin. To be able to target the label I used the adjacent sibling selector.
  *
  */

  .search {
    position: fixed;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: table-cell;
    font-weight: 500;
    color: #fff;
    float: right;
    margin: 9px;
    right: 0;
    width: 176px;
  }

  .search-box {
    flex: 1 0 auto;
    margin: 0 12px;
    border: 0;
    transition: all .15s ease-in-out;
  }

  .search-box:focus {
    flex: 1 0 90%;
    margin: 0;
    outline: 0;
  }

  .search-label {
    position: absolute;
    top: 8px;
    right: 8px;
    transition: all .15s ease-in-out;
    color: #f5f5f5;
    opacity: 0.7;
  }

  .search-label i {
    font-size: 28px;
  }

  .search-box:focus + .search-label {
    transform: translateX(12px);
  }
</style>
