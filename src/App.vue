<template>
  <div id="app">
    <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <ControlPanel/>
      </div>
    </div>
      <div class="row">
        <div class="col-md-3">
          <ContainerList/>
        </div>
        <div class="col-md-9">
          <WorkArea/>
        </div>
      </div>
    </div>
    </div>
</template>

<script>

import WorkArea from "./components/WorkArea";
import ControlPanel from "./components/ControlPanel";
import ContainerList from "./components/ContainerList";
import './plugins/bootstrap'

export default {
  name: 'App',
  components: {
    ControlPanel,
    ContainerList,
    WorkArea
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
