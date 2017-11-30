<template>
    <div class="container">
        <div class="navbar navbar-inverse ng-scope">
            <div class="navbar-collapse collapse navbar-inverse-collapse">
                <h4 class="heading">Bookings Log</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <div class="form-group">
                    <input type="text" v-model="filterobject.searchvalue" @input="searchall" class="form-control"
                           id="searchvalue" placeholder="🔎">
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <vue-datepicker-local inputClass="form-control" v-if="showDate" format="DD/MM/YYYY" :local="local"
                                          :time="time" v-model="pickedDaterange" :disabled-date="disabledDate"
                                          :range-separator="separator"/>
                </div>
            </div>
        </div>
        
        <div id="filter-row" class="row">
            <div class="col-sm-4">
                    <div class="form-group">
                        <select v-model="filterobject.bookingsource" v-on:change="setBookingSource" class="form-control"
                                name="bookingsource" id="bookingsource" data-placeholder="Choose a Booking Source"
                                placeholder="Choose a Booking Source">
                            <option value="none" selected>All</option>
                            <option value="WeKare">We Kare</option>
                            <option value="uptechgh">Uptech Guest House</option>
                            <option value="hlgh">Home Like Guest House</option>
                        </select>
                    </div>
            </div>
            <div class="col-sm-1">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" v-model="filterobject.paid"
                                   v-on:change="onFilterChange()">Paid (100%)
                        </label>
                    </div>
            </div>
            <div class="col-sm-1">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" v-model="filterobject.advpaid"
                                   v-on:change="onFilterChange()">Adv Paid (30%)
                        </label>
                    </div>
            </div>
            <div class="col-sm-4">
              <download-excel
                class   = "btn btn-default"
                :data   = "json_data"
                :fields = "json_fields"
                name    = "filename.xls">
                Download Excel
              </download-excel>
            </div>
        </div>
    </div>
</template>
<script src="./contactlogfilter-component.js"></script>
<style src="./contactlogfilter-component.css"></style>
