<script>
  import $ from 'jquery'

  export default {
    name: 'NavBar',

    vuex: {
      getters: {
        user: ({ github }) => github.user
      }
    },

    ready () {
      $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: true, // Does not change width of dropdown to that of the activator
        // hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'right' // Displays dropdown with edge aligned to the left of button
      });
    }
  }
</script>

<template>
  <!-- Dropdown Structure -->
  <ul id="dropdownMenu" class="dropdown-content">
    <li>
      <a href="#" tabindex="-1" class="waves-effect waves-teal"><i class="material-icons tiny">perm_contact_calendar</i>Profile</a>
    </li>
    <li>
      <a href="#" tabindex="-1" class="waves-effect waves-teal"><i class="material-icons tiny">settings</i>Settings</a>
    </li>
    <li class="divider"></li>
    <li>
      <a href="#" tabindex="-1" class="waves-effect waves-teal"><i class="material-icons tiny">exit_to_app</i>Exit</a>
    </li>
  </ul>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper open">
        <span href="#!" class="brand-logo waves-effect waves-light">Throidal</span>
        <ul class="right hide-on-med-and-down">
          <!-- Dropdown Trigger -->
          <li>
            <a class="dropdown-button waves-effect waves-light" href="#!" data-activates="dropdownMenu">
              <div class="nav-userinfo">
                <img :src="user.avatar_url" alt="{{ user.login }}">
                <span>{{ user.login }}</span>
                <i class="material-icons right">arrow_drop_down</i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style>
  nav {
    background-color: #e91e63;
  }

  nav .brand-logo {
    font-size: 1.8rem;
  }

  .nav-wrapper.open .brand-logo {
    transform: translate3d(264px, 0, 0);
  }

  .nav-wrapper .brand-logo {
    transform: translate3d(88px, 0, 0);
  }

  .nav-wrapper .dropdown-button {
    position: absolute;
    bottom: 0;
    right: 20px;
    display: block;
    height: 64px;
    line-height: 64px;
    padding: 0;
    padding-left: 12px;
    padding-right: 12px;
    text-decoration: none;
    clear: both;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .nav-userinfo img {
    width: 48px;
    height: 48px;
    margin: 8px;
    float: left;
    border: 3px solid rgba(0, 0, 0, 0.14);
    border-radius: 50%;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .nav-userinfo span {
    margin: 0 -5px 0 10px;
  }

  .dropdown-content li > a > i {
    float: left;
    margin-right: 16px;
    font-size: 1.6rem;
  }
</style>
