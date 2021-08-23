<template>
<div class="template_oldversion_div">
    <div class="older_version" v-on:click="view_version = !view_version">
        <div>Versjon({{eldre_versjon.version}}) {{getDate(eldre_versjon.date)}}</div>
        <div class="arrow down" v-if="view_version"></div>
        <div class="arrow left" v-else></div>
    </div>
    <div class="olderversion_detail_div" v-if="view_version">
        <p style="margin-top: 1px;"> Bilder til opptrening: {{eldre_versjon.image_training}} </p>
        <p> Basert på fasiter:  </p>
        <ul>
            <li v-for="undertraining_base in eldre_versjon.undertraining_base"> {{undertraining_base}} </li>
        </ul>
        <p> Opprettet av {{eldre_versjon.updated_by}} </p>

        <router-link :to="{ path : removePathDuplication }" tag="div" class="seemore_div" @click.native="scrollToTop()">
            see more
        </router-link>

    </div>
</div>

</template>

<script>
import OldModel from '../../../store/OldModel'

export default {

    props : {
        eldre_versjon : { type: Object }
    },
    data(){
        return {
            view_version : false
        }
    },
    computed:{
        removePathDuplication: function(){

            var path_arr = this.$store.getters.RetrieveRouterAddress.split("/")
            //check second last is old version
            if(path_arr[path_arr.length-2] == 'old_version'){
                var new_path = ''
                //fill the array with new path
                for(var i=1; i<path_arr.length-1; i++ ){
                    new_path += '/' + path_arr[i]
                }
                //replacing new id with old id
                new_path += '/' + this.eldre_versjon.id

                return new_path
            }
            else
                return this.$route.path + '/old_version/' + this.eldre_versjon.id
        }

    },
    methods:{
        scrollToTop() {
            console.log("Iam scrolling")
             window.scrollTo(0,0);
        },
        getDate: function(string_date){
            var date = new Date(string_date)
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth() + 1;  // months start at zero
            var day = date.getUTCDate();
            //console.log("Date : ",year, month, day)
            date = day+'.'+month+'.'+year
            return date
        },
    }
}
</script>

<style scoped>
.template_oldversion_div{
    font-size           : 13px;
    font-weight         : normal;
}
.older_version{
    padding             : 10px;
    display             : flex;
    font-weight         : bold;
    justify-content     : space-between;
}
.arrow{
    width               : 10px;
    height              : 10px;
    background-repeat   : no-repeat;
    background-size     : 10px;
}
.arrow.left{
    background-image    : url('./../../../assets/triangle-up-active.svg');
}
.arrow.down{
    background-image    : url('./../../../assets/triangle-down-active.svg');
}
.olderversion_detail_div{
    padding             : 20px;
}
.seemore_div{
    text-align          : end;

}
.seemore_div:hover{
    cursor              : pointer;
     text-decoration-line: underline;
}
</style>