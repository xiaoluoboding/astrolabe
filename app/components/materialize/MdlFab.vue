<script>
  export default {
    name: 'MdlFab'
  }
</script>

<template>
  <div class="fab">
    <a href="#" class="btn-fab btn-floating waves-effect waves-light red" tooltip="Github"><i class="material-icons">insert_chart</i></a>
    <a href="#" class="btn-fab btn-floating waves-effect waves-light yellow darken-1" tooltip="Google+"><i class="material-icons">format_quote</i></a>
    <a href="#" class="btn-fab btn-floating waves-effect waves-light green" tooltip="Twitter"><i class="material-icons">publish</i></a>
    <a href="#" class="btn-fab btn-floating waves-effect waves-light blue" tooltip="Facebook"><i class="material-icons">attach_file</i></a>
    <a href="#" class="btn-fab btn-large btn-floating waves-effect waves-light red" tooltip="Share">
      <i class="large material-icons">mode_edit</i>
    </a>
  </div>
</template>

<style>
  .fab {
    margin: 1em;
    position: fixed;
    bottom: 0;
    right: 20px;
    z-index: 1099;
  }

  .fab:hover .btn-fab:not(:last-of-type) {
    width: 40px;
    height: 40px;
    margin: 15px auto 0;
    opacity: 1;
  }

  .fab:hover .rotate {
    background-image: url("http://goo.gl/0eJslQ");
    transform: rotate(0deg);
  }

  .btn-fab {
    display: block;
    width: 35px;
    height: 35px;
    margin: 20px auto 0;
    text-decoration: none;
    position: relative;
    border-radius: 50%;
    overflow: inherit;
    box-shadow: 0px 5px 11px -2px rgba(0, 0, 0, 0.18), 0px 4px 12px -7px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: .2s;
  }

  .btn-fab:nth-last-of-type(2) {
    transition-delay: 20ms;
  }

  .btn-fab:nth-last-of-type(3) {
    transition-delay: 40ms;
  }

  .btn-fab:nth-last-of-type(4) {
    transition-delay: 60ms;
  }

  .btn-fab:nth-last-of-type(5) {
    transition-delay: 80ms;
  }

  .btn-fab:nth-last-of-type(6) {
    transition-delay: 100ms;
  }

  .btn-fab:nth-last-of-type(1) {
    width: 56px;
    height: 56px;
    opacity: 1;
  }

  .btn-fab:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  }

  [tooltip]:before {
    content: attr(tooltip);
    background: #585858;
    padding: 5px 7px;
    margin-right: 10px;
    border-radius: 2px;
    color: #FFF;
    font: 500 12px Roboto;
    white-space: nowrap;
    position: absolute;
    bottom: 20%;
    right: 100%;
    visibility: hidden;
    opacity: 0;
    transition: .3s;
  }

  [tooltip]:hover:before {
    visibility: visible;
    opacity: 1;
  }
</style>
