<template>
  <div id="contact-log">
    <div class="container">
      <div class="alert alert-info" role="alert" v-if="loading">
            <i class="glyphicon glyphicon-refresh spin"></i>
      </div>      
      <div class="row">
        <div class="col-sm-12">
          <div class="panel panel-default" v-bind:class="[seen ? expandClass : noClass, noClass]">
            <div class="panel-body">
              <div id="maximize-widgets">
                <a  v-on:click="seen = !seen">Add new Booking?</a>
                <i class="fa fa-window-maximize pull-right" v-on:click="seen = !seen"></i>
              </div>
              <div id="minimize-widgets">
                <i class="fa fa-window-minimize pull-right" v-on:click="seen = !seen"></i>
                <div class="row">
                  <div class="col-sm-3">
                    <div class="form-group">
                      <input class="form-control"                                                
                        v-model="userdata.n_BookNumber"
                        style="width: 100%" 
                        name="n_BookNumber" 
                        id="n_BookNumber"
                        required
                        placeholder="Enter Booking Number"
                        data-placeholder="Enter Booking Number">                        
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                       <input class="form-control"                                                
                        v-model="userdata.n_GuestName"
                        style="width: 100%" 
                        name="n_GuestName" 
                        id="n_GuestName"
                        required
                        placeholder="Enter Guest Name"
                        data-placeholder="Enter Guest Name">
                      
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group" >
                      <select v-model="userdata.n_Rooms" v-on:change="setRooms" class="form-control"  name="n_rooms" id="n_rooms"  data-placeholder="Choose No of Rooms" placeholder="Choose No of Rooms">
                        <option value="none" selected>All</option>
                        <option value="1" selected>1</option>
                        <option value="2" selected>2</option>
                        <option value="3" selected>3</option>
                        <option value="4" selected>4</option>
                        <option value="5" selected>5</option>
                        <option value="6" selected>6</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group" >
                      <select v-model="userdata.n_People" v-on:change="setPeople" class="form-control"  name="n_People" id="n_People"  data-placeholder="Choose No of People" placeholder="Choose No of People">
                        <option value="none" selected>All</option>
                        <option value="1" selected>01</option>
                        <option value="2" selected>02</option>
                        <option value="3" selected>03</option>
                        <option value="4" selected>04</option>
                        <option value="5" selected>05</option>
                        <option value="6" selected>06</option>
                        <option value="7" selected>07</option>
                        <option value="8" selected>08</option>
                        <option value="9" selected>09</option>
                        <option value="10" selected>10</option>
                        <option value="11" selected>11</option>
                        <option value="12" selected>12</option>
                        <option value="13" selected>13</option>
                        <option value="14" selected>14</option>
                        <option value="15" selected>15</option>
                        <option value="16" selected>16</option>
                        <option value="17" selected>17</option>
                        <option value="18" selected>18</option>
                        <option value="19" selected>19</option>
                        <option value="20" selected>20</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <textarea class="form-control" rows="3" 
                      v-model="userdata.n_Remarks" 
                      placeholder="Description/Notes"></textarea>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-5 col-lg-6">
                    <div class="bootstrap-tagsinput22222">
                      <input class="form-control"                                                
                        v-model="userdata.n_Checkin"
                        style="width: 100%" 
                        name="n_Remarks" 
                        id="n_Remarks"
                        required
                        placeholder="Enter Check In"
                        data-placeholder="Enter Check In">                                                 
                    </div>
                  </div>
                  <div class="col-sm-3 col-lg-3">
                    <input class="form-control"                                                
                        v-model="userdata.Checkout"
                        style="width: 100%" 
                        name="n_Checkout" 
                        id="n_Checkout"
                        required
                        placeholder="Enter Check Out Date"
                        data-placeholder="Enter Check Out Date"> 
                  </div>
                  <div class="col-sm-4 col-lg-3">
                    <div class="btn-group btn-block dropup">
                      <button  v-bind:disabled="!disableButton"   @click.prevent="createNewLog()" type="button"  id="log-contact-btn" class="btn btn-danger col-xs-10">Log contact</button>
                    </div>
                  </div>                  
                </div>
                <div class="row" v-if="logregisteredsuccess && loading === false" style="height:30px;margin-bottom:20px;">
                <div class="col-sm-12" style="height:30px;margin-bottom:20px;">
                  <div class="sucessalert">
                      Booking has been created!
                  </div>
                </div>
              </div>     
              </div>
            </div>
          </div>          
        </div>        
      </div>       
    </div>
  </div>
</template>
<script src="./contactlogentry-component.js"></script>
<style src="./contactlogentry-component.css"></style>
