<script>
  export default {
    name: 'Search',

    props: [
      'searchQuery'
    ]
  }
</script>
<template>
  <form action="" class="search">
    <input class="search-box" type="search" id="search-box" autocomplete="off" v-model="searchQuery">
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
    position: relative;
    /*display: flex;*/
    /*margin-top: 8px;*/
    /*color: #555;*/
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
