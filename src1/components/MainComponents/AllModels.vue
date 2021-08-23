<template>
    <div class="allmodels_div">
        <TableComponent :columns_array="columns_array"
                        :data_array="returnModels"
                        @row-click="rowClick"
                        style="width: 80%;">
        </TableComponent>
    </div>
</template>

<script>
import TableComponent from '../CommonComponent/TableComponent'
export default {
    components:{
        TableComponent
    },
    data(){
        return{
            columns_array: [
                {
                    key: 'created_by_name',
                    title: 'Created By',
                    type: 'text',
                },
                {
                    key : 'name',
                    title : 'Model Name',
                    type : 'text',
                    value_style: { fontWeight: 'normal' },
                },
                {
                    key : 'version',
                    title : 'Version',
                    type : 'text',
                    width: '80px',
                    value_style: { fontWeight: 'normal' },
                },
                {
                    key : 'created_at',
                    title : 'Created at',
                    type : 'text',
                    precompute: function(val){
                        var date = new Date(val)
                        var year = date.getUTCFullYear();
                        var month = date.getUTCMonth() + 1;  // months start at zero
                        var day = date.getUTCDate();
                        return day+'.'+month+'.'+year
                    },
                    value_style: { fontWeight: 'normal' },
                },
                {
                    key : 'updated_at',
                    title : 'Updated at',
                    type : 'text',
                    precompute: function(val){
                        var date = new Date(val)
                        var year = date.getUTCFullYear();
                        var month = date.getUTCMonth() + 1;  // months start at zero
                        var day = date.getUTCDate();
                        return day+'.'+month+'.'+year
                    },
                    value_style: { fontWeight: 'normal' },
                },

            ],
        }
    },
    mounted(){
        console.log('Models: ',this.returnModels)
        //Updating the path track in Vuex
        this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)
    },
    computed:{
        returnModels: function(){
            return this.$store.getters.RetrieveModels
        }
    },
    methods:{
        rowClick: function(obj){

            var newrouter_link = ''
            //spliting router link string and store in array
            var string_arr = this.$router.currentRoute.path.split("/")

            for (let i = 1; i < string_arr.length - 1; i++)
                newrouter_link += "/"+string_arr[i];

            this.$router.push({ path:  newrouter_link +'/models/'+ obj.id })
        }
    }

}
</script>

<style>
.allmodels_div{
    display: flex;
    padding-top: 20px;
    justify-content: center;
}
</style>