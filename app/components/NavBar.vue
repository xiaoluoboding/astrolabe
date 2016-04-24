<script>
  export default {
    name: 'NavBar'
  }
</script>

<template>
  <!-- Dropdown Structure -->
  <ul id="dropdown1" class="dropdown-content">
    <li><a href="#!">one</a></li>
    <li><a href="#!">two</a></li>
    <li class="divider"></li>
    <li><a href="#!">three</a></li>
  </ul>
  <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo waves-effect waves-teal">Logo</a>
      <ul class="right hide-on-med-and-down">
        <!-- Dropdown Trigger -->
        <li>
          <a class="dropdown-button waves-effect waves-teal" href="#!" data-activates="dropdown1">
            <div class="nav-userinfo">
              <img src="../assets/images/bg.jpg">
              <span>Malanore</span>
              <i class="material-icons right">arrow_drop_down</i>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>


<style>
  .nav-wrapper {
    margin-left: 300px;
  }

  .nav-wrapper .dropdown-button {
    position: absolute;
    bottom: 0;
    right: 0;
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
    border-radius: 50%;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .nav-userinfo span {
    margin: 0 -5px 0 10px;
  }
</style>
