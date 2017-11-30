<template>
  <div id="log-history">
    <div v-if="loglistloading">
      <div class="loading style-2"><div class="loading-wheel"></div></div>
    </div>
    <div class="row">
      <div class="col-sm-12" v-for="(groupentries, index) in contactLogs" v-bind:key="index">
        <div class="row">
          <div class="col-sm-12">
            <h5>
              <blockheading :headertext = "index"></blockheading>
            </h5>
          </div>
        </div>
        <div class="log-history-month">
          <div class="col-sm-12" v-for="entry in groupentries" v-bind:key="entry.id">
            <logentry :entry="entry"></logentry>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="!loglistloading">
      <div class="col-sm-12" v-if="loglistlengthloading === 0">
        <div style="text-align:center; padding-top: 12px; color: #002F36!important;"><h1 style="color: #002F36!important;">Sorry, no logs yet for the member.</h1></div>
      </div>
    </div>
  </div>
</template>
<script src="./contactloglist-component.js"></script>
<style src="./contactloglist-component.css"></style>
