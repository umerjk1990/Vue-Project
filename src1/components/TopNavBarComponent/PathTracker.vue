<template >
    <div class='template_pathtrack' v-if="loadData">
        <div  v-for="(path, index) in path_array" :key="index">
            <div class="pathtracker_div" v-if="!rename_project">
                <div class="icon_div"></div>
                <div class="path_name_div" v-on:click="changePath(path)">
                    {{displayPath(path)}}
                    <div class="small_star_div" v-if="(path.name == 'Projects') && path.id && isFavorite(path.id)"></div>
                    <span>/</span>
                </div>
            </div>

            <!-- Renaming the project Name -->
            <div v-else v-focus-ref-on-create:search_tb="rename_project">
                <input  type="text"
                        ref='search_tb'
                        id=input_name
                        class="editname"
                        :value="displayPath(path)"
                        v-on:keyup.enter="(rename_project = !rename_project, $store.commit('toggleRenameProject'), updateName())">
                <ButtonComponent
                    @cancel-click="cancelClick()"
                    @confirm-click="confirmClick()">
                </ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script>

import ButtonComponent  from '../CommonComponent/ButtonComponent'
import OldModel         from '../../store/OldModel'
import vue_directives   from '../../vue-directives'

export default {
    components:{
        ButtonComponent
    },
    data(){
        return{
            path : null,
            path_array : [],
            rename_project : false,

            project : [],
            dataset : [],
            models : [],
            blueprint : [],
            old_models : OldModel.data.oldModel
        }
    },
    mounted(){

        this.$store.watch( () => this.$store.getters.RetrieveRouterAddress, router_address => {
            this.path_array = []
            this.path = router_address.split("/")
            //changing page will close the Renaming Project name Component
            this.rename_project  =false
            for(var i=1; i<this.path.length; i++){
                if(isNaN(this.path[i]) && !isNaN(this.path[i+1])){
                    this.path_array.push({name : this.path[i], id : this.path[i+1]})
                    i=i+1
                }
                else{
                    this.path_array.push({name : this.path[i], id : null})
                }
            }
        })

        this.$store.watch(() => this.$store.state.rename_project, rename_project => {
            this.rename_project = rename_project
        } )
    },
    computed:{
        getSingleDataset: function(){
            var dataset = this.$store.getters.RetrieveDataSet
        },
        loadData: function(){
            this.project    = this.$store.getters.doneFetchingProjects
            this.dataset    = this.$store.getters.RetrieveDataSet
            this.models     = this.$store.getters.RetrieveModels
            this.blueprint  = this.$store.getters.RetrieveDataSet
            //this.old_models = OldModel.data.oldModel
            return true
        },


    },
    methods:{
        updateName: function(){
            //Update the name at the backend here
            //Code here...
        },
        confirmClick: function(e){
            this.rename_project = !this.rename_project
            this.$store.commit('toggleRenameProject')
            this.updateName()
        },
        cancelClick: function(e){
            this.rename_project = !this.rename_project
            this.$store.commit('toggleRenameProject')
        },
        changePath: function(path){

            let id = path.id
            let name = path.name

            var newrouter_link = ''
            //fetch router link from Vuex
            var getrouter_address = this.$store.getters.RetrieveRouterAddress
            //spliting router link string and store in array
            var string_arr = getrouter_address.split("/")

            for(var i = 1; i <= string_arr.length-1; i++){

                if(!id && name ==string_arr[i]){
                    newrouter_link =  newrouter_link + "/" + string_arr[i]
                    break
                }
                if(string_arr[i] == id){
                    newrouter_link =  newrouter_link + "/" + string_arr[i]
                    break
                }
                else{
                    newrouter_link =  newrouter_link + "/" + string_arr[i]
                }

            }
            //update the Vuex with new router path
            this.$store.dispatch('UpdateRouterAddress', newrouter_link)
            //update the router path
            this.$router.push({path: newrouter_link})
        },

        isFavorite: function(id){
            var fav = false
            this.project.map( o => {
                if(id == o.id){
                    fav = o.favorite
                }
            })
            return fav
        },

        displayPath: function(path_object){
            //Add path detection condition here
            //console.log("Path Object : ",path_object.name   )
            //console.log('Path : ', path_object)

            //if path has
            if(path_object.id == null){
                return path_object.name
            }

            //if projects then search inside the project list
            else if(path_object.name == 'Projects' ){
                if(this.project.length != 0)//using if to handel the undefine error
                    return this.searchList(this.project, path_object).name

            }

            //if datasets then search inside the datasets list
            else if(path_object.name == 'datasets'){
                if(this.dataset.length != 0)//using if to handel the undefine error
                {
                    return this.searchList(this.dataset, path_object).name
                }
            }

            //if models then search inside the models list
            else if(path_object.name == 'models'){
                if(this.models.length != 0)//using if to handel the undefine error
                    return this.searchList(this.models, path_object).name
            }

            //if oldmodel then search inside the old models list
            else if(path_object.name == 'old_version'){
                 return 'Version ' + this.searchList(this.old_models, path_object).version
            }

            else if(path_object.name == 'Blueprint'){
                if(this.blueprint.length != 0)//using if to handel the undefine error
                    return this.searchList(this.blueprint, path_object).name
            }

            else
                return 'Unknown Path'
        },
        searchList: function(array_list, path_object){
            for(var i=0; i<array_list.length; i++){
                if(array_list[i].id == path_object.id)
                    return array_list[i]
            }
        }
    },
}
</script>

<style scoped>
.template_pathtrack{
    padding-top: 15px;
    padding-left: 10px;
    display: flex ;
    font-size: 20px;
}
.pathtracker_div{
    display: flex;
}
.icon_div{
    width: 20px;
    height: 20px;
    margin: 5px 10px 10px 10px;
    background-color: rgba(128, 128, 128, 0.401)
}
.path_name_div{
    font-weight: 600;
    color: #14253c;
    display: flex;
    letter-spacing: 0.3px;
}
.path_name_div:hover{
    cursor: pointer;
}
.small_star_div{
    width: 10px;
    height: 10px;
    background-image    : url('../../assets/star_favourite.svg');
    background-repeat   : no-repeat;
    background-position : center;
}
.editname{
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: #14253c;
    background: transparent;
    border: transparent;
}
</style>