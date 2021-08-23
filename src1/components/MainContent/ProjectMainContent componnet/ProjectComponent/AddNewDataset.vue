<template>
    <div class="ands_template_div" @keydown.enter="createAnotherDataset()" v-focus-ref-on-create:inputtext_ref="input_focus">
        <div class="main_heading_div">Create Dataset</div>
        <div class="light_heading_div" style="margin-bottom: 10px;">Create one or more dataset</div>

        <!-- List of dataset created -->
        <transition-group name="zoomInDown" tag='div'>
            <div v-for="(dataset, index) in dataset_array" :key="dataset.id">
                <div class="small_heading_div saved_dataset" v-on:click="viewDataset(dataset, index)"> {{dataset.name}} </div>
            </div>
        </transition-group>

        <div class="small_heading_div" style="margin-top:20px;">Name</div>
        <input  type="text"
                ref='inputtext_ref'
                class="textbox_input"
                placeholder="Enter Name..."
        >
        <div class="small_heading_div" style="margin-top:20px;">Last uploaded file</div>
        <div class="light_heading_div input">
            Select file from your computer
            <!-- When click on this button we have to select the file from the computer -->
        </div>
        <div class="small_heading_div" style="margin-top:20px;">Handling
            <br/>
            <input type="radio" name="q" v-on:click="lock = true, active = false, populated = false" v-model="picked" value="1">
            <span  class="light_heading_div" style="font-weight: normal" checked="checked" > As individuall images </span>
            <br/>
            <input type="radio" name="q" v-on:click="lock = false, active = false, populated = true" v-model="picked" value="2">
            <span  class="light_heading_div" style="font-weight: normal"> As time series, at intervals of </span>
            <div class="time_wrapper_div">
                <div class="set_time_div">
                    <img class="icon" :src=arrowDownIcon() v-on:click="decreaseTime()">
                    <input class="time_input" v-model="get_time" @keypress="getNumberOnly" @keydown.up="increaseTime" @keydown.down="decreaseTime" :style="{ color : textColor, width : returnWidth }">
                    <img class="icon" :src=arrowUpIcon() v-on:click="increaseTime()">
                </div>
                <div style="display: flex; position: relative">
                    <input type="text" class="timetype_div input" :value="time_format" :style="{ color : textColor }" readonly @keydown.down="getTime('down')" @keydown.up="getTime('up')">
                    <!-- <div class="timetype_div" :style="{ color : textColor }">
                        {{ getTime() }}
                    </div> -->
                    <img class="icon" :src=triangleDownIcon() style="margin-left: 10px;" v-on:click="timer_boolean = !timer_boolean">
                    <div class="timetype_div list" v-if="timer_boolean">
                        <div class="tl" v-for="tl in timer_list" v-on:click="time_format = tl, timer_boolean = false">
                            <div> {{tl}} </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="adddataset_wrapper_div" v-on:click="createAnotherDataset()">
            <div class="add_moredataset_icon"></div>
            <div class="light_heading_div small">Add more Dataset</div>
        </div>
        <ButtonComponent style="margin-top: 30px;" :confirm="'Create'" @cancel-click="$emit('cancel-clicked', false)" @confirm-click="createClick"></ButtonComponent>

    </div>
</template>

<script>

import ButtonComponent from '../../../CommonComponent/ButtonComponent'
import InputTextField  from '../../../CommonComponent/InputTextFieldComponent'

export default {
    components: {
        ButtonComponent,
        InputTextField,
    },
    mounted(){
        this.time_format = this.timer_list[0]
    },
    data(){
        return{
            a : true,
            active : false,
            lock : true,
            populated: false,
            get_time: '00',
            timer_boolean : false,
            timer_list : ['Second', 'Minutes', 'Hours'],
            time_format : '',
            picked : 1,//radio button picked

            dataset_array : [],
            dataset_name : '',
            dataset_obj : null,

            input_focus : false,

            //different color of svg icon
            arrow_active_down    : require("../../../../assets/arrow-down-active.svg"),
            arrow_populated_down : require("../../../../assets/arrow-down-populated.svg"),
            arrow_lock_down      : require("../../../../assets/arrow-down-lock.svg"),
            arrow_active_up      : require("../../../../assets/arrow-up-active.svg"),
            arrow_populated_up   : require("../../../../assets/arrow-up-populated.svg"),
            arrow_lock_up        : require("../../../../assets/arrow-up-lock.svg"),

            triangle_active_down    : require("../../../../assets/triangle-down-active.svg"),
            triangle_populated_down : require("../../../../assets/triangle-down-populated.svg"),
            triangle_lock_down      : require("../../../../assets/triangle-down-lock.svg"),
            triangle_active_up      : require("../../../../assets/triangle-up-active.svg"),
            triangle_populated_up   : require("../../../../assets/triangle-up-populated.svg"),
            triangle_lock_up        : require("../../../../assets/triangle-up-lock.svg"),

        }
    },
    computed: {
        returnWidth: function(){

            return this.get_time.length * 8 +'px'
        },
        textColor: function(){

            if(this.active)
                return '#2d2c2c'
            else if(this.populated)
                return '#737373'
            else
                return '#d6dde8'
        },
    },
    methods: {

        viewDataset:function(dataset_object,i){

            this.dataset_array.splice(i,1)
            this.$refs.inputtext_ref.value = dataset_object.name
            this.input_focus = true
        },

        createAnotherDataset: function(){

            if( this.$refs.inputtext_ref.value != ""){

                this.dataset_obj = {
                    id: Math.floor(Math.random()*100000),
                    name : this.$refs.inputtext_ref.value,
                    lastuploadedfiel : 'File not found',
                    //handling :
                }
                this.dataset_array.push(this.dataset_obj)
                this.dataset_obj = null
                this.$refs.inputtext_ref.value = ""
                this.picked = 2
                this.get_time = "00"
                this.time_format = this.timer_list[0]
                this.$refs.inputtext_ref.focus()

            }

        },

        increaseTime: function(){

            if(this.picked == 2){

                var integer = parseInt(this.get_time, 10)
                integer++
                var formattedNumber = ("0" + integer).slice(-2);
                this.get_time = formattedNumber
            }
        },
        decreaseTime: function(){
            if(this.picked == 2){

                var integer = parseInt(this.get_time, 10)
                integer--
                var formattedNumber = ("0" + integer).slice(-2);
                this.get_time = formattedNumber
            }
            if(Math.sign(this.get_time == -1) )
                this.get_time = "99"
        },

        getNumberOnly: function(event){

            let keyCode = (event.keyCode ? event.keyCode : event.which)
             // only allow number
            if (keyCode < 48 || keyCode > 57)
                event.preventDefault();
            //allow only two digits
            if(this.get_time!=null && (this.get_time.length > 1))
                event.preventDefault();

        },
        getTime: function(str){

            var index = this.timer_list.indexOf(this.time_format)
            if(str == 'down'){
                if(this.timer_list.length-1 == index)
                    this.time_format = this.timer_list[0]
                else
                    this.time_format = this.timer_list[index+1]
            }
            else{
                if(index == 0)
                    this.time_format = this.timer_list[this.timer_list.length-1]
                else
                    this.time_format = this.timer_list[index-1]
            }
        },
        createClick: function(event){

            //When Create buttonn is click
            //add dataset in database
            console.log("Create button is clicked...")
        },
        arrowDownIcon: function(){

            if(this.active)
                return this.arrow_active_down
            else if(this.populated)
                return this.arrow_populated_down
            else
                return this.arrow_lock_down
        },
        arrowUpIcon: function(){

            if(this.active)
                return this.arrow_active_up
            else if(this.populated)
                return this.arrow_populated_up
            else
                return this.arrow_lock_up
        },
        triangleDownIcon: function(){
            if(this.active)
                return this.triangle_active_down
            else if(this.populated)
                return this.triangle_populated_down
            else
                return this.triangle_lock_down
        },
        triangleUpIcon: function(){
            if(this.active)
                return this.triangle_active_up
            else if(this.populated)
                return this.triangle_populated_up
            else
                return this.triangle_lock_up
        }
    }

}
</script>

<style scoped>
.zoomInDown-enter-active {
    animation: zoomInDown .5s;
}
.zoomInDown-leave-active{
    animation: zoomInDown .5s reverse;
}
@keyframes zoomInDown {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}


.ands_template_div{
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    text-align: left;
    color: #14253c;
}
.main_heading_div{
    font-size: 20px;
    font-weight: bold;
}
.light_heading_div{
    font-size: 16px;
    line-height: 1.38;
    color: #65768f;
    width: 300px;
}
.light_heading_div.input{
    border-radius: 8px;
    padding: 10px;
    font-size: 13px;
    background-color: #00b271ad;
    color: white;
}
.light_heading_div.input:hover{
    cursor: pointer;
}
.light_heading_div.small{
    font-size: 13px;
}
.small_heading_div{
    font-size: 13px;
    font-weight: 600;
    line-height: 1.85;
}
.small_heading_div.saved_dataset{

    background-image: url('../../../../assets/triangle-down-active.svg');
    background-repeat: no-repeat;
    background-size: 10px;
    background-position-x: 99%;
    background-position-y: 50%;
}
.small_heading_div.saved_dataset:hover{
    cursor: pointer;
    background-color: rgba(128, 128, 128, 0.231);
}
.add_moredataset_icon{
    width: 20px;
    height: 20px;
    background-image: url('../../../../assets/square-add-button.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    margin-right: 10px;
}
.set_time_div{
    display: flex;
}
.icon{
    width: 13px;
}
.icon:hover{
    cursor: pointer;
}
.minutes_count_div{
    padding-left: 10px;
    padding-right: 10px;
    color : #a1b3ce;
    font-size: 13px;
}
.time_input{
    padding-left: 10px;
    font-size: 15px;
    border: transparent;
    margin-right: 10px;
}
.timetype_div{
    width: 50px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 20px;
    color: #a1b3ce;
    font-size: 13px;
    border-right: 1px solid #a1b3ce;
    border-left: 1px solid #a1b3ce;
}
.timetype_div.list{
    position: absolute;
    background-color: white;
    padding: 10px;
    top: 25px;
    border: 1px solid #a1b3ce;
}
.timetype_div.input{
    border-top: transparent;
    border-bottom: transparent;
}
.tl:hover{
    cursor: pointer;
    color: black;
}
.time_wrapper_div{
    display: flex;
    margin-top: 10px;
}
.time_wrapper_div:hover{
    cursor: pointer;
}
.button_wrapper{
    display: flex;
}
.adddataset_wrapper_div{
    display:flex;
    margin-top:20px;
}
.adddataset_wrapper_div:hover{
    cursor: pointer;
    color: black;
}
.adddataset_wrapper_div:focus{
    border: solid 1px grey;
    background-color: red;
}
.textbox_input{
    width               : 93%;
    height              : 30px;
    background          : transparent;
    border              : transparent;
    color               : #65768f;
    font-size           : 18px;
    padding-left        : 15px;
    font-size           : 13px;
    font-weight         : normal;
    border              : solid 2px #d6dde8;
    border-radius       : 8px;
}
</style>