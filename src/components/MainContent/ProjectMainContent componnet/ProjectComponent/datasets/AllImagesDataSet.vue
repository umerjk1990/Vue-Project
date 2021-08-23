<template>
    <div class="allimages_template_div">
        <div>
            <div class="text_bold_div"> Images(30 123) </div>
            <div style="display: flex; margin-top: 25px;">
                <InputTextFieldComponent    style="width:810px"
                                            :search_icon="true"
                                            :display_text="'Search by file name, date or metadata'"
                                            :border_style="'solid 1px #d6dde8'">
                </InputTextFieldComponent>
                <div class="sort_div">Sort by</div>
            </div>
            <div class="image_wrapper_div">
                <div class="image_div" v-for="(image, index) in users" :key="index"> {{showImages(image)}} </div>
            </div>
        </div>
        <div class="slide_navigation_div">
            <div class="icon_div double_arrow_left" v-on:click="first()"></div>
            <div class="icon_div single_arrow_left" v-on:click='prev()'></div>
            <div style="display: flex;">
                <div class="page_number_div" v-for="(image, i) in pagecount" :key="i">
                    <p class="page_number_p selected" v-if="pageno == image" v-on:click="page(image)">{{image}}</p>
                    <p class="page_number_p" v-else v-on:click="page(image)">{{image}}</p>
                </div>
            </div>
            <div class="icon_div single_arrow_right" v-on:click="next()"></div>
            <div class="icon_div double_arrow_right" v-on:click='last()'></div>
        </div>
    </div>
</template>

<script>

import SearchBarDataSet         from './SearchBarDataSet'
import InputTextFieldComponent  from '../../../../CommonComponent/InputTextFieldComponent'

export default {
    components:{
        SearchBarDataSet,
        InputTextFieldComponent,
    },
    data(){
        return {
            images : [
                {pic : 'Picture 1'},
                {pic : 'Picture 2'},
                {pic : 'Picture 3'},
                {pic : 'Picture 4'},
                {pic : 'Picture 5'},
                {pic : 'Picture 6'},
                {pic : 'Picture 7'},
                {pic : 'Picture 8'},
                {pic : 'Picture 9'},
                {pic : 'Picture 10'},
                {pic : 'Picture 11'},
                {pic : 'Picture 12'},
                {pic : 'Picture 13'},
                {pic : 'Picture 14'},
                {pic : 'Picture 15'},
                {pic : 'Picture 16'},
                {pic : 'Picture 17'},
                {pic : 'Picture 18'},
                {pic : 'Picture 19'},
                {pic : 'Picture 20'},
                {pic : 'Picture 21'},
                {pic : 'Picture 22'},
                {pic : 'Picture 23'},
                {pic : 'Picture 24'},
                {pic : 'Picture 25'},
                {pic : 'Picture 26'},
                {pic : 'Picture 27'},
                {pic : 'Picture 28'},
                {pic : 'Picture 29'},
                {pic : 'Picture 30'},
                {pic : 'Picture 31'},
                {pic : 'Picture 32'},
                {pic : 'Picture 33'},
                {pic : 'Picture 34'},
                {pic : 'Picture 35'},
                {pic : 'Picture 36'},
                {pic : 'Picture 37'},
                {pic : 'Picture 38'},
                {pic : 'Picture 39'},
                {pic : 'Picture 40'},
                {pic : 'Picture 41'},
                {pic : 'Picture 42'},
                {pic : 'Picture 43'},
                {pic : 'Picture 44'},
                {pic : 'Picture 45'},
                {pic : 'Picture 46'},
                {pic : 'Picture 47'},
                {pic : 'Picture 48'},
                {pic : 'Picture 49'},
                {pic : 'Picture 50'},
                {pic : 'Picture 51'},
                {pic : 'Picture 52'},
                {pic : 'Picture 53'},
                {pic : 'Picture 54'},
                {pic : 'Picture 55'},
                {pic : 'Picture 56'},
                {pic : 'Picture 57'},
                {pic : 'Picture 58'},
                {pic : 'Picture 59'},
                {pic : 'Picture 60'},
                {pic : 'Picture 61'},
                {pic : 'Picture 62'},
                {pic : 'Picture 63'},
                {pic : 'Picture 64'},
                {pic : 'Picture 65'},
                {pic : 'Picture 66'},
                {pic : 'Picture 67'},
                {pic : 'Picture 68'},
                {pic : 'Picture 69'},
                {pic : 'Picture 70'},
                {pic : 'Picture 71'},
                {pic : 'Picture 72'},
                {pic : 'Picture 73'},
                {pic : 'Picture 74'},
                {pic : 'Picture 75'},
                {pic : 'Picture 76'},
                {pic : 'Picture 77'},
                {pic : 'Picture 78'},
                {pic : 'Picture 79'},
                {pic : 'Picture 80'},
                {pic : 'Picture 81'},
                {pic : 'Picture 82'},
                {pic : 'Picture 83'},
                {pic : 'Picture 84'},
                {pic : 'Picture 85'},
                {pic : 'Picture 86'},
                {pic : 'Picture 87'},
                {pic : 'Picture 88'},
                {pic : 'Picture 89'},
                {pic : 'Picture 90'},
                {pic : 'Picture 91'},
                {pic : 'Picture 92'},
                {pic : 'Picture 93'},
                {pic : 'Picture 94'},
                {pic : 'Picture 95'},
                {pic : 'Picture 96'},
                {pic : 'Picture 97'},
                {pic : 'Picture 98'},
                {pic : 'Picture 99'},
                {pic : 'Picture 101'},
                {pic : 'Picture 102'},
                {pic : 'Picture 103'},
                {pic : 'Picture 104'},
                {pic : 'Picture 105'},
                {pic : 'Picture 106'},
                {pic : 'Picture 107'},
                {pic : 'Picture 108'},
                {pic : 'Picture 109'},
                {pic : 'Picture 110'},
                {pic : 'Picture 111'},
                {pic : 'Picture 112'},
                {pic : 'Picture 113'},
                {pic : 'Picture 114'},
                {pic : 'Picture 115'},
                {pic : 'Picture 116'},
                {pic : 'Picture 117'},
                {pic : 'Picture 118'},
                {pic : 'Picture 119'},
            ],
            users: [],
            pageno: 1,
            pagesize: 0,
            pagecount: 0,

        }
    },
    mounted(){
        //Updating the path track in Vuex
        this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)

        this.init()
    },
    computed:{
        virtualDataFromDb: function(){
            var images = []
            for (let i = 0; i <= 300; i++) {

                var image = {
                    id: Math.random() * 10000,
                    pic: 'Picture '+ i
                }
                images.push(image)
            }
            return images
        },
        returnPagesize: function(){

            console.log('Height : ', window.screen)
            return 35
        }
    },
    methods:{
        init: function(){
            this.pagesize = this.returnPagesize
            this.virtualService({
                pageno: this.pageno,
                pagesize: this.pagesize,
            })
        },
        page: function(pageno){
            this.virtualService({
                pageno: pageno,
                pagesize: this.pagesize,
            })
        },
        first: function(){
            this.pageno = 1
            this.virtualService({
                pageno: this.pageno,
                pagesize: this.pagesize,
            })
        },
        last: function(){
            this.pageno =this.pagecount
            this.virtualService({
                pageno: this.pageno,
                pagesize: this.pagesize,
            })
        },
        prev: function(){
            if(this.pageno > 1){
                this.pageno -= 1
                this.virtualService({
                    pageno: this.pageno,
                    pagesize: this.pagesize
                })
            }
        },
        next: function(){
            if(this.pageno < this.pagecount){
                this.pageno += 1
                this.virtualService({
                    pageno: this.pageno,
                    pagesize: this.pagesize,
                })
            }
        },
        count: function(){
            return this.virtualDataFromDb.length
        },
        queryFromVirtualDb(condition, start_row, end_row){

            var result = []
            var condition = {}
            var data = this.virtualDataFromDb
            var count = this.count()

            for (let index = start_row - 1; index < end_row; index++) {
                if(index < count)
                    result.push(data[index])
            }
            return result
        },
        virtualService: function(params){

            var result = []
            var condition = {}
            var pageno = params.pageno
            var pagesize = params.pagesize
            var pagecount = Math.ceil(this.count() / pagesize)

            if(pageno == 0)
                pageno = 1
            if(pageno < 0)
                pageno = pagecount
            else if(pageno > pagecount)
                pageno = pagecount

            var startrow = (pageno -1) * pagesize + 1
            var endrow = startrow + pagesize -1
            var data = this.queryFromVirtualDb(condition, startrow, endrow)

            this.users = data
            this.pageno = pageno
            this.pagecount = pagecount
        },

        showImages: function(image){
            return image.pic
        },
        retunPageNumber: function(i){
            if(i % 25 == 0 && i != 0){
                console.log("i : ", i)
                return true
            }
            else
                return false
        }
    }
}
</script>

<style scoped>
.allimages_template_div{
    font-size       : 16px;
    font-weight     : bold;
    font-style      : normal;
    font-stretch    : normal;
    letter-spacing  : normal;
    text-align      : left;
    color           : #65768f;
}
.text_bold_div{
    font-size: 13px;
}
.sort_div{
    width: 170px;
    height: 26px;
    padding-top: 9px;
    padding-left: 20px;
    background-color: white;
    border-radius: 4px;
    border: solid 1px #d6dde8;
    margin-left: 15px;
    font-size: 13px;
    font-weight: normal;
    background-image: url('../../../../../assets/triangle-down-populated.svg');
    background-size: 10px;
    background-repeat: no-repeat;
    background-position-x: 90%;
    background-position-y: 50%;
    cursor: pointer;
}
.image_wrapper_div{
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;
    width: 1030px;
}
.image_div{
    width: 190px;
    height: 145px;
    margin: 8px;
    background-color: #d6dde8;
    vertical-align: middle;
    line-height: 145px;
    text-align: center;
}
.slide_navigation_div{
    margin-top: 25px;
    margin-bottom: 50px;
    display: flex;
    float: right;
}
.icon_div{
    width: 15px;
    height: 15px;
    background-size: 15px;
    background-repeat: no-repeat;
    cursor: pointer;
}
.icon_div.double_arrow_left{
    background-image: url('../../../../../assets/double_arrow_left.svg');
    background-size: 20px;
    width: 20px;
    height: 20px;
    background-position-y: -3px;


}
.icon_div.double_arrow_right{
    background-image: url('../../../../../assets/double_arrow_right.svg');
    background-size: 20px;
    width: 20px;
    height: 20px;
    background-position-y: -3px;

}
.icon_div.single_arrow_left{
    background-image: url('../../../../../assets/triangle down.svg');
    transform: rotate(90deg);
    margin-left: 15px;
}
.icon_div.single_arrow_right{
    background-image: url('../../../../../assets/triangle down.svg');
    transform: rotate(-90deg);
    margin-right: 15px;
}
.page_number_div{
    margin-top: -3px;
}
.page_number_p{
    margin: 0px;
    cursor: pointer;
    padding-left: 5px;
    padding-right: 5px;
}
.page_number_p.selected{
    color: white;
    background-color: #65768f;
}
</style>
