<script>
  import {
    setSearchQuery,
    filterByLanguage
  } from '../vuex/actions'
  import Search from './Search'
  import $ from 'jquery'
  const jQuery = $

  export default {
    name: 'SideBar',

    data () {
      return {
        activeLang: 'all'
      }
    },

    vuex: {
      getters: {
        reposCount: ({ github }) => github.reposCount,
        untaggedCount: ({ github }) => github.untaggedCount,
        searchQuery: ({ sidebar }) => sidebar.searchQuery,
        langGroup: ({ github }) => github.langGroup,
        theme: ({ global }) => global.theme
      },
      actions: {
        setSearchQuery,
        filterByLanguage
      }
    },

    ready() {
      // Sidebar toggle
      $(document).ready(function() {
        var overlay = $('.sidebar-overlay');

        jQuery.Velocity ? console.log("Velocity is already loaded") : console.log('Velocity is not working')

        $('.sidebar-toggle').on('click', function() {
          var sidebar = $('#sidebar');
          sidebar.toggleClass('open');
          $('.nav-wrapper').toggleClass('open');
          $('.search').toggle(320);
          $('.nav.sidebar-nav span').toggle(320);
          // $('.add-tag').tooltip('toggle')
          if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')) {
            overlay.addClass('active');
          } else {
            overlay.removeClass('active');
          }
        });

        overlay.on('click', function() {
          $(this).removeClass('active');
          $('#sidebar').removeClass('open');
        });
      });
      // Sidebar content
      $(document).ready(function() {
        var sidebar = $('#sidebar');
        var sidebarHeader = $('#sidebar .sidebar-header');
        var sidebarImg = sidebarHeader.css('background-image');

        $('select').css('display', 'inherit');

        // Sidebar position
        $('#sidebar-position').change(function() {
          var value = $(this).val();
          sidebar.removeClass('sidebar-fixed-left sidebar-fixed-right sidebar-stacked').addClass(value).addClass('open');
          if (value === 'sidebar-fixed-left' || value === 'sidebar-fixed-right') {
            $('.sidebar-overlay').addClass('active');
          }
        });

        // Header cover
        $('#sidebar-header').change(function() {
          var value = $(this).val();

          $('.sidebar-header').removeClass('header-cover').addClass(value);

          if (value === 'header-cover') {
            sidebarHeader.css('background-image', sidebarImg)
          } else {
            sidebarHeader.css('background-image', '')
          }
        });
      });
      // Nestable Setup
      // $(document).ready(function() {
      //   $('.dd').nestable();
      // });

      /**
       * Created by Kupletsky Sergey on 08.09.14.
       *
       * Add JQuery animation to bootstrap dropdown elements.
       */

      (function($) {
        var dropdown = $('.dropdown');

        // Add slidedown animation to dropdown
        dropdown.on('show.bs.dropdown', function(e) {
          $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
        });

        // Add slideup animation to dropdown
        dropdown.on('hide.bs.dropdown', function(e) {
          $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        });
      })(jQuery);

      (function(removeClass) {
        jQuery.fn.removeClass = function(value) {
          if (value && typeof value.test === 'function') {
            for (var i = 0, l = this.length; i < l; i++) {
              var elem = this[i];
              if (elem.nodeType === 1 && elem.className) {
                var classNames = elem.className.split(/\s+/);

                for (var n = classNames.length; n--;) {
                  if (value.test(classNames[n])) {
                    classNames.splice(n, 1);
                  }
                }
                elem.className = jQuery.trim(classNames.join(' '));
              }
            }
          } else {
            removeClass.call(this, value);
          }
          return this;
        }
      })(jQuery.fn.removeClass);

      $(window).resize(function() {
        $('.sidebar-nav').css('height', $(this).height() - 124)
      })
    },

    methods: {
      toggleLang (lang) {
        this.activeLang = lang
      }
    },

    components: {
      Search
    }
  }
</script>
<template>
  <!-- Overlay for fixed sidebar -->
  <div class="sidebar-overlay"></div>

  <!-- Material sidebar -->
  <aside id="sidebar" class="sidebar sidebar-colored sidebar-stacked open" role="navigation">
    <!-- Sidebar header -->
    <div class="sidebar-header" :class="[theme.baseColor, theme.accentColor]">
      <!-- Top bar -->
      <div class="top-bar">
        <!-- Sidebar toggle button -->
        <a class="waves-effect waves-light btn-flat btn-floating sidebar-toggle"><i class="material-icons">menu</i></a>
        <search></search>
      </div>
    </div>
    <!-- Sidebar navigation -->
    <ul class="nav sidebar-nav">
      <li :class="{active: activeLang == 'all'}" @click="toggleLang('all')">
        <a href="#" class="waves-effect waves-teal" @click="setSearchQuery('')">
          <i class="material-icons">star</i>
          <span class="blue-grey-text">All Stars</span>
          <span class="sidebar-badge" :class="[theme.baseColor, theme.darkenColor]" v-text="reposCount"></span>
        </a>
      </li>
      <li :class="{active: activeLang == 'null'}" @click="toggleLang('null')">
        <a href="#" class="waves-effect waves-teal" @click="filterByLanguage('null')">
          <i class="material-icons">bookmark_border</i>
          <span class="blue-grey-text">Untagged Stars</span>
          <span class="sidebar-badge" :class="[theme.baseColor, theme.darkenColor]" v-text="untaggedCount"></span>
        </a>
      </li>
      <li class="divider"></li>
      <li class="dropdown">
        <a class="ripple-effect dropdown-toggle" href="#" data-toggle="dropdown">
          <i class="material-icons">label</i>
          <span class="blue-grey-text">Tag Group</span>
          <b class="caret"></b>
        </a>
        <ul class="dropdown-menu">
          <li>
            <a href="#" tabindex="-1" class="waves-effect waves-teal">
              <i class="material-icons">label_outline</i>
              <span class="blue-grey-text">JavaScript</span>
              <span class="sidebar-badge">12</span>
            </a>
          </li>
          <li>
            <a href="#" tabindex="-1" class="waves-effect waves-teal">
              <i class="material-icons">label_outline</i>
              <span class="blue-grey-text">Css</span>
              <span class="sidebar-badge">0</span>
            </a>
          </li>
          <li>
            <a href="#" tabindex="-1" class="waves-effect waves-teal">
              <i class="material-icons">label_outline</i>
              <span class="blue-grey-text">Html</span>
              <span class="sidebar-badge">0</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="divider"></li>
      <div class="dd" id="nestable">
        <ol class="dd-list">
          <li class="dd-item" data-id="{{ index }}"
              v-for="(index, group) in langGroup | orderBy 'count' -1"
              v-if="group.count >= 5 && group.lang != 'null'"
              @click="toggleLang(group.lang)"
              :class="{active: activeLang == group.lang}">
            <div class="dd-handle">
              <a href="#" class="waves-effect" :class="group.color" @click="filterByLanguage(group.lang)">
                <i class="material-icons">local_offer</i>
                <span class="blue-grey-text">{{ group.lang }}</span>
                <span class="sidebar-badge" :class="[theme.baseColor, theme.darkenColor]">{{ group.count }}</span>
              </a>
            </div>
          </li>
        </ol>
      </div>
    </ul>
    <!-- Sidebar divider -->
    <!-- <div class="sidebar-divider"></div> -->

    <!-- Sidebar action -->
    <!-- <div class="sidebar-action">
      <a href="#!" class="add-tag waves-effect waves-circle waves-light btn-floating" data-toggle="tooltip" data-placement="left" title="Add A Tag">
        <i class="material-icons">add</i>
      </a>
    </div> -->
  </aside>
</template>
<style>
  .sidebar-overlay {
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background: #000;
    z-index: 1034;
    -webkit-transition: visibility 0 linear 0.4s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    -moz-transition: visibility 0 linear 0.4s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transition: visibility 0 linear 0.4s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
  }

  .sidebar-overlay.active {
    opacity: 0.5;
    visibility: visible;
    -webkit-transition-delay: 0;
    -moz-transition-delay: 0;
    transition-delay: 0;
  }

  .top-bar {
    height: 64px;
  }

  .top-bar span {
    display: inline-block;
    color: white;
    font-size: 29px;
    padding: 12px;
  }
  /* -- Google typography ------------------------------- */

  .headline {
    font-size: 24px;
    font-weight: 300;
    line-height: 1.1;
    color: #212121;
    text-transform: inherit;
    letter-spacing: inherit;
  }

  .subhead {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.1;
    color: #212121;
    text-transform: inherit;
    letter-spacing: inherit;
  }
  /* -- Bootstrap-like style ------------------------------- */

  .caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px solid;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }

  .dropdown-menu {
    display: none;
  }
  /* -- Content style ------------------------------- */

  .content {
    position: relative;
    margin: 0;
    -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    -o-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  .sidebar-stacked + .wrapper .content {
    margin-left: 64px;
  }

  .sidebar-stacked.open + .wrapper .content {
    margin-left: 240px;
  }
  /* -- Sidebar style ------------------------------- */

  .sidebar {
    position: relative;
    display: block;
    min-height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    border: none;
    -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    -o-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .sidebar:before,
  .sidebar:after {
    content: " ";
    display: table;
  }

  .sidebar:after {
    clear: both;
  }

  .sidebar::-webkit-scrollbar-track {
    border-radius: 2px;
  }

  .sidebar::-webkit-scrollbar {
    width: 5px;
    background-color: #F7F7F7;
  }

  .sidebar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #BFBFBF;
  }

  .sidebar .sidebar-header {
    position: relative;
    height: 64px;
    margin-bottom: 8px;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .sidebar .sidebar-header.header-cover {
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .sidebar .sidebar-header:hover .sidebar-toggle {
    opacity: 1;
  }

  .sidebar .sidebar-toggle {
    position: relative;
    float: left;
    margin: 12px;
    padding: 0;
    background-image: none;
    border: none;
    height: 40px;
    width: 40px;
    font-size: 20px;
    opacity: 0.7;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .sidebar .sidebar-toggle:before,
  .sidebar .sidebar-toggle:after {
    content: " ";
    display: table;
  }

  .sidebar .sidebar-toggle:after {
    clear: both;
  }

  .sidebar .icon-material-sidebar-arrow:before {
    content: "\e610";
  }

  .sidebar .sidebar-user-info img {
    width: 56px;
    height: 56px;
    margin: 4px;
    border-radius: 50%;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .sidebar .sidebar-user-info span {
    margin-left: 12px;
  }

  .sidebar .sidebar-brand {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    height: 64px;
    line-height: 64px;
    padding: 0;
    padding-left: 12px;
    padding-right: 56px;
    text-decoration: none;
    clear: both;
    font-weight: 500;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .sidebar .sidebar-brand:hover,
  .sidebar .sidebar-brand:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none;
  }

  .sidebar .sidebar-brand .caret {
    position: absolute;
    right: 28px;
    top: 28px;
  }

  .sidebar .sidebar-brand .sidebar-badge {
    position: absolute;
    right: 16px;
    top: 12px;
    font-size: 12px;
    padding: 0px 6px;
  }

  .sidebar .sidebar-brand:hover,
  .sidebar .sidebar-brand:focus {
    text-decoration: none;
  }

  .sidebar .sidebar-badge {
    display: inline-block;
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    padding: 0 6px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
  }

  .sidebar .sidebar-badge.badge-circle {
    border-radius: 50%;
  }

  .sidebar .sidebar-divider,
  .sidebar .sidebar-nav .divider {
    position: relative;
    display: block;
    height: 1px;
    margin: 8px 0;
    padding: 0;
    overflow: hidden;
  }

  .sidebar .sidebar-action {
    position: inherit;
    display: block;
    bottom: 0;
    height: 64px;
    width: 240px;
    line-height: 64px;
    padding: 0;
    text-decoration: none;
    clear: both;
    font-weight: 500;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .sidebar .sidebar-action a {
    margin: 14px;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .sidebar.open .sidebar-action a {
    margin: 14px;
    -webkit-transform: translate3d(176px, 0, 0);
    transform: translate3d(176px, 0, 0);
  }

  .sidebar .sidebar-action:hover,
  .sidebar .sidebar-action:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none;
  }

  .sidebar .sidebar-action .caret {
    position: absolute;
    right: 24px;
    top: 24px;
  }

  .sidebar .sidebar-action .sidebar-badge {
    position: absolute;
    right: 16px;
    top: 12px;
    font-size: 12px;
    padding: 0px 6px;
  }

  .sidebar .sidebar-icon {
    display: inline-block;
    margin-right: 16px;
    min-width: 40px;
    width: 40px;
    text-align: left;
    font-size: 20px;
  }

  .sidebar .sidebar-icon:before,
  .sidebar .sidebar-icon:after {
    vertical-align: middle;
  }

  .sidebar .sidebar-nav {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .sidebar .sidebar-nav li {
    position: relative;
    list-style-type: none;
  }

  .sidebar .sidebar-nav li a {
    position: relative;
    cursor: pointer;
    user-select: none;
    display: block;
    height: 48px;
    line-height: 48px;
    padding: 0;
    text-decoration: none;
    clear: both;
    font-weight: 500;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .sidebar .sidebar-nav li a:hover,
  .sidebar .sidebar-nav li a:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none;
  }

  .sidebar .sidebar-nav li a .caret {
    position: absolute;
    right: 24px;
    top: 24px;
  }

  .sidebar .sidebar-nav li a .sidebar-badge {
    position: absolute;
    right: 16px;
    top: 12px;
  }

  .sidebar .sidebar-nav li a:hover {
    background: transparent;
  }

  .sidebar .sidebar-nav .dropdown-menu {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .sidebar-colored {
    background-color: #fff;
  }

  .sidebar-colored .sidebar-header {
    background-color: #e91e63;
  }

  .sidebar-colored .sidebar-toggle {
    color: #f5f5f5;
    background-color: transparent;
  }

  .sidebar-colored .sidebar-brand {
    color: #e0e0e0;
    background-color: transparent;
  }

  .sidebar-colored .sidebar-brand:hover,
  .sidebar-colored .sidebar-brand:focus {
    color: #f5f5f5;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .sidebar-colored .sidebar-badge {
    color: #fff;
    background-color: #ec407a;
  }

  .sidebar-colored .sidebar-divider,
  .sidebar-colored .sidebar-nav .divider {
    background-color: #bdbdbd;
  }

  .sidebar-colored .sidebar-action {
    color: #212121;
  }

  .sidebar-colored .sidebar-nav li > a {
    color: #212121;
    background-color: transparent;
  }

  .sidebar-colored .sidebar-nav li > a i {
    color: #757575;
    margin: 12px 20px;
    float: left;
  }

  .sidebar-colored .sidebar-nav li:hover > a,
  .sidebar-colored .sidebar-nav li > a:hover {
    color: #e91e63;
    background-color: #e0e0e0;
  }

  .sidebar-colored .sidebar-nav li:hover > a i,
  .sidebar-colored .sidebar-nav li > a:hover i {
    color: #f06292;
  }

  .sidebar-colored .sidebar-nav li:focus > a,
  .sidebar-colored .sidebar-nav li > a:focus {
    color: #212121;
    background-color: transparent;
  }

  .sidebar-colored .sidebar-nav li:focus > a i,
  .sidebar-colored .sidebar-nav li > a:focus i {
    color: #f06292;
  }

  .sidebar-colored .sidebar-nav > .open > a,
  .sidebar-colored .sidebar-nav > .open > a:hover,
  .sidebar-colored .sidebar-nav > .open > a:focus {
    color: #e91e63;
    background-color: #e0e0e0;
  }

  .sidebar-colored .sidebar-nav > .active > a,
  .sidebar-colored .sidebar-nav > .active > a:hover,
  .sidebar-colored .sidebar-nav > .active > a:focus {
    color: #212121;
    background-color: #f5f5f5;
  }

  .sidebar-colored .sidebar-nav > .active > a i,
  .sidebar-colored .sidebar-nav > .active > a:hover i,
  .sidebar-colored .sidebar-nav > .active > a:focus i{
    color: #f06292;
  }

  .sidebar-colored .sidebar-nav > .disabled > a,
  .sidebar-colored .sidebar-nav > .disabled > a:hover,
  .sidebar-colored .sidebar-nav > .disabled > a:focus {
    color: #e0e0e0;
    background-color: transparent;
  }

  .sidebar-colored .sidebar-nav > .dropdown > .dropdown-menu {
    background-color: #e0e0e0;
  }

  .sidebar-colored .sidebar-nav > .dropdown > .dropdown-menu > li > a:focus {
    background-color: #e0e0e0;
    color: #e91e63;
  }

  .sidebar-colored .sidebar-nav > .dropdown > .dropdown-menu > li > a:hover {
    background-color: #cecece;
    color: #e91e63;
  }

  .sidebar-colored .sidebar-nav > .dropdown > .dropdown-menu > .active > a,
  .sidebar-colored .sidebar-nav > .dropdown > .dropdown-menu > .active > a:hover,
  .sidebar-colored .sidebar-nav > .dropdown > .dropdown-menu > .active > a:focus {
    color: #212121;
    background-color: #f5f5f5;
  }

  .sidebar {
    width: 0;
    -webkit-transform: translate3d(-240px, 0, 0);
    transform: translate3d(-240px, 0, 0);
  }

  .sidebar.open {
    min-width: 240px;
    width: 240px;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .sidebar-fixed-left,
  .sidebar-fixed-right,
  .sidebar-stacked {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1035;
  }

  .sidebar-stacked {
    left: 0;
    min-width: 64px;
    width: 64px;
    transform: translate3d(0, 0, 0);
  }

  .sidebar-fixed-left {
    left: 0;
    box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.35);
    -webkit-box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.35);
  }

  .sidebar-fixed-right {
    right: 0;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.35);
    -webkit-box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.35);
    -webkit-transform: translate3d(240px, 0, 0);
    transform: translate3d(240px, 0, 0);
  }

  .sidebar-fixed-right.open {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .sidebar-fixed-right .icon-material-sidebar-arrow:before {
    content: "\e614";
  }

  .sidebar-nav span {
    display: inline-block;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .sidebar-stacked.open + .wrapper .content {
      margin-left: 192px;
    }
    .sidebar.open {
      min-width: 192px;
      width: 192px;
    }
    .sidebar .sidebar-header {
      height: 56px;
    }
    .sidebar .sidebar-user-info img {
      width: 44px;
      height: 44px;
    }
    .top-bar {
      height: 56px;
    }
    .top-bar span {
      font-size: 29px;
      padding: 8px;
    }
    .sidebar .sidebar-toggle {
      margin: 8px;
    }
  }
</style>
