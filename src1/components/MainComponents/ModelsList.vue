<template>
<div class="template_modelcomponent">
    <div class="starfavorite_div" v-on:click="favorite = !favorite">
        <div class="favorite_div" v-if="favorite"></div>
        <div class="unfavorite_div" v-else></div>
    </div>
    <router-link :to="{ path : $route.path + '/models/' + model.id }" tag="div" >
        <div class="modelname_div"> {{model.name}} </div>
        <div class="created_div"        > Created: {{getDate(model.created_at)}} </div>
        <div class="during_training_div"> During Training: N/A          </div>
        <div class="calculatedtime_div" > Time Calculated: N/A          </div>
    </router-link>
</div>
</template>

<script>
export default {
    props:{
        model: {
            type: Object
        }
    },
    data(){
        return{
            favorite: false
        }
    },
    methods:{

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
.template_modelcomponent{
    width               : 250px;
    height              : 120px;
    background-color    : #fff;
    margin              : 10px 10px 10px 0px;
    border              : solid 1px #cecece;
    padding             : 20px 20px 20px 20px;
    border-radius       : 20px;
    font-size           : 13px;
    font-weight         : normal;
    color               : #5a5a5a;
}
.template_modelcomponent:hover{
    background-color    : #f7f7f7;
    border              : solid 1px #b9b9b9;
    cursor              : pointer;
}

.starfavorite_div{
    position            : relative;
}
.starfavorite_div:hover{
    cursor              : pointer;
}
.favorite_div{
    width               : 20px;
    height              : 20px;
    background-image    : url('../../assets/star_favourite.svg');
    background-repeat   : no-repeat;
    background-position : center;
    background-size     : 20px;
    position            : absolute;
    right               : 0;
}
.favorite_div:hover{
    background-image    : url('../../assets/favourite onfocus star.svg');
}
.unfavorite_div{
    width               : 20px;
    height              : 20px;
    background-image    : url('../../assets/star_unfavourite.svg');
    background-repeat   : no-repeat;
    background-position : center;
    background-size     : 20px;
    position            : absolute;
    right               : 0;
}
.unfavorite_div:hover{
    background-image    : url('../../assets/onfocus star.svg');
}
.template_div{
    width               : 100%;
    padding-top         : 10px;
    margin-bottom       : 20px;
    display             : flex;
    float               : left;
    font-size           : 13px;
    font-weight         : normal;
    line-height         : 2.62;
    color               : #1b204e;

    /* Font Style */
    font-size           : 13px;
    font-weight         : normal;
    color               : #5a5a5a;
}
.models_div{
    width               : 260px;
    border-radius       : 20px;
    border              : solid 1px #cecece;
    background-color    : #ffffff;
    display             : flex;
    justify-content     : space-between;
    padding             : 20px;
    margin-right        : 20px;
    /* margin-left         : 10px; */
}
.models_div:hover{
    background-color    : #f7f7f7;
    border              : solid 1px #b9b9b9;
}
.modelname_div{
    font-size           : 16px;
    font-weight         : bold;
    font-style          : normal;
    color               : #14253c;
}
.created_div{
    margin-bottom       : 50px;
    font-style          : italic;
    color               : #65768f;
}
.during_training_div{
    color: #14253c
}
.calculatedtime_div{
    color: #14253c
}

</style>
