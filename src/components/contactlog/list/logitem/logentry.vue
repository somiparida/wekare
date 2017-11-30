<template>
<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-default" v-bind:class="[panelshow ? expandPanelClass : collapsePanelClass, expandPanelClass]">
            <div class="panel-body" v-on:click.stop="panelshow = !panelshow" v-bind:class = "this.isacomplaintlog === true ? showalertbgcol : showdefaultbgcol">
                <p class="desc hidden-expanded" >{{entry.GuestName}}&nbsp;&nbsp;[{{entry.Phone}}] - {{entry.source}}</p>
                <p class="notes hidden-collapsed"><b>Booking No:-</b>{{entry.BookNumber}}&nbsp;&nbsp;&nbsp;<b>Guest:</b> {{entry.GuestName}}</p>
                <p v-bind:class="[entry.Remarks !== '' ? hiddenCollapsedClass : hiddenExpandedClass, collapsePanelClass]">                    
                    <span class="doc-link">
                        <a href="#">{{entry.Remarks}}</a>
                    </span>
                </p>
                <p class="hidden-collapsed">
                    <span>
                        <p  style="margin-left:3px;">
                           <b>FROM:-</b>{{entry.Checkin}}  <b>To:-</b>{{entry.Checkout}} <br/>
                            <b>No Of Rooms Booked:-</b>{{entry.Rooms}} <br/>
                            <b>Payment Done:</b> <toggle-button :value=true  v-model="entry.paid" :sync="true" color="green"  v-on:change="setPaymentStatus($event)"  :labels="{checked: 'PAID', unchecked: 'UNPAID'}"/><br/>
                            <b>Advanced Payment Done:</b><input type="text"  class="form-control entries"  v-model="entry.advpaid" placeholder="" @change="setAdvPayment($event)" v-on:click.stop.prevent="clickvoid($event)"><br/>
                            <b>Free Breakfast:</b> <toggle-button :value="true"  v-model="entry.freebreakfast" :sync="true" color="green"  v-on:click.stop.prevent="clickvoid($event)" @change="setFreeBreakfast($event)"  :labels="{checked: 'YES', unchecked: 'NA'}"/><br/>
                            <b>Free Transport:</b> <toggle-button :value="true"  v-model="entry.freecab" :sync="true" color="green"  v-on:click.stop.prevent="clickvoid($event)" @change="setFreeCab($event)" :labels="{checked: 'YES', unchecked: 'NA'}"/><br/>
                            <b>Phone:</b><input type="text"  class="form-control entries"  v-model="entry.Phone"  v-on:click.stop.prevent="clickvoid($event)"  @change="setPhoneNumber($event)"  v-on:blur="clickvoid($event)"    /><br/>
                        </p>
                </span>

                </p>
                <p class="call-summary small"><b>No Of People :-</b> {{entry.People}}&nbsp;/&nbsp;<b>Cost:-</b> {{entry.Price}}&nbsp;/&nbsp;<b>PaymentStatus:- </b>{{(entry.paid === 1 || entry.paid === true) ? 'PAID' : 'NOT PAID'}}&nbsp;/&nbsp;<b>PaymentMethod:-</b>{{entry.PaymentMethod}}&nbsp;<b>Free Breakfast:</b>&nbsp;{{(entry.freebreakfast === 1 || entry.freebreakfast === true) ? 'YES' : 'NO' }}&nbsp;&nbsp;<b>Free CAB:</b>&nbsp;{{(entry.freecab === 1 || entry.freecab === true) ? 'YES' : 'NO'}}</p>
                
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import * as types from '../../../../store/types'
import blockheading from '../logheading/logheading'
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)
export default {
  data () {
    return {
      log: this.entry,
      panelshow: false,
      expandPanelClass: '',
      hiddenExpandedClass: 'hidden-expanded',
      hiddenCollapsedClass: 'hidden-collapsed',
      collapsePanelClass: 'collapsed',
      showalertbgcol: 'bg-danger',
      showdefaultbgcol: '',
      selected: '',
      isacomplaintlog: false,
      method: ''
    }
  },
  components: {
    blockheading
   // 'app-switch': Switch
  },
  name: 'logentry',
  props: ['entry'],
  methods: {
    clickvoid (event) {
      if (event) event.preventDefault()
    },
    setPaymentStatus (e) {
      this.$store.dispatch(types.SET_PAIDSTATUS, this.entry)
    },
    setFreeBreakfast (event) {
     // if (event) event.preventDefault()
      this.$store.dispatch(types.SET_FREEBREAKFAST, this.entry)
    },
    setAdvPayment (event) {
     // if (event) event.preventDefault()
      this.$store.dispatch(types.SET_ADVPAYMENT, this.entry)
    },
    setPhoneNumber (event) {
     // if (event) event.preventDefault()
      this.$store.dispatch(types.SET_PHONE, this.entry)
      this.panelshow = false
    },
    setFreeCab (event) {
    //  if (event) event.preventDefault()
      this.$store.dispatch(types.SET_FREECAB, this.entry)
    }
  },
  created: function () {
   /* if (this.entry.details.length > 0) {
      if (this.entry.details[0].method.length > 0) {
        this.callmethod = this.entry.details[0].method[0].description
      }
    }
    if (this.entry.satisfaction.id === '3') {
      this.isacomplaintlog = false
    } else {
      this.isacomplaintlog = true
    } */
  },
  watch: {
    u_paid: function () {
      if (this.u_paid === false) {
        this.u_freebreakfast = false
        this.u_freecab = false
      }
    }
  }
}
</script>

<style lang="css">
.alertbgcol{
  border-radius: 0;
  background-color: #f8626a;
}
.normalbgcol{
  border-radius: 0;
}
input.form-control .entries {
 /* width: 50px; */
}
</style>