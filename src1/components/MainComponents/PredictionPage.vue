<template>
    <div class="template_div">
        <div class="blueprint_div">
            <div>Prediction Status</div>
            <div class="normal_text_div">96.2%  (29 897 av 31 450)</div>
            <div class="progress_bar_div">
                <div class="outer_progress_bar_div">
                    <div class="inner_progress_bar_div"></div>
                </div>
                <div class="continue_annotation_div" >New content in data seen since the last run
                    <div class="start_div" >Start</div>
                </div>
            </div>
            <div style="margin-top: 60px;"> Facts made from the prediction
                <div class="normal_text_div" style="margin-top: 20px"> Coming Soon... </div>
            </div>
        </div>
        <RightBar>
            <div class="information_div" v-on:click="information = !information">
                <div>Information</div>
                <img v-if="information" src="../../assets/triangle-down-active.svg" class="image_icon">
                <img v-else             src="../../assets/triangle-up-active.svg" class="image_icon">
            </div>
            <div v-if="information">

                <div class="bold_text_div">Created</div>
                <div class="normal_font_div" style="margin-top: 12px;">
                    <div style="width: 100px;">By</div>
                    <div> ... </div>
                </div>

                <div class="normal_font_div" style="margin-top: 8px;">
                    <div style="width: 100px;">Date</div>
                    <div> ... </div>
                </div>

                <div class="normal_font_div" style="margin-top: 8px;">
                    <div style="width: 100px;">Images</div>
                    <div> ... </div>
                </div>

                <div class="normal_font_div" style="margin-top: 8px;">
                    <div style="width: 100px;">Dataset</div>
                    <div> ... </div>
                </div>
            </div>

            <div class="bold_text_div">Description</div>
            <div class="normal_font_div" style="margin-top: 12px;"> ... </div>
        </RightBar>
    </div>
</template>

<script>
import RightBar from '../CommonComponent/RightBar'
export default {
    components:{
        RightBar,
    },
    data(){
        return{
            information : false
        }
    },
    mounted(){
        //Updating the path track in Vuex
        console.log("Helo _: ", this.$router.currentRoute.path)
        this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)
    }
}
</script>

<style>
.template_div{
    height: 100%;
    display: flex;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: #65768f;
}
.blueprint_div{
    width: 100%;
    justify-content: center;
    align-content: center;
    padding: 30px;
}
.normal_text_div {
    font-weight: normal;
    font-size: 13px;
}
.progress_bar_div{
    margin-top: 24px;
}
.outer_progress_bar_div{
    width: 100%;
    height: 60px;
    border: solid 1px #d6dde8;
    border-radius: 13px;
    background-color: #d6dde8;
}
.inner_progress_bar_div{
    width: 96%;
    height: 60px;
    border: solid 1px #d6dde8;
    border-radius: 13px;
    background-color: #19dda0;
}
.continue_annotation_div{
    margin-top: 10px;
    text-align: end;
    font-weight: normal;
    cursor: pointer;
    display: flex;
    justify-content: end;
    align-items: center;
}
.continue_annotation_div:hover{
    text-decoration-line: underline;
}
.start_div{
    width: 65px;
    height: 35px;
    border-radius: 8px;
    border: solid 1px #14253c;
    font-weight: 600;
    color: #14253c;
    text-align: center;
    vertical-align: middle;
    line-height: 35px;
    margin-left: 25px;
    text-decoration-line: none;
}
.information_div{
    display: flex;
    font-weight: bold;
    color: #14253c;
    cursor: pointer;
}
.bold_text_div{
    font-weight: bold;
    font-size: 13px;
    color: #14253c;
    margin-top: 24px;
}
.normal_font_div{
    display: flex;
    font-weight: normal;
    font-size: 13px;
    color: #14253c;
}
.image_icon{
    width: 10px;
    margin-left: 10px;

}
</style>