<template>
    <div class="project_wrapper" >
        <div class="models_wrapper_div">

            <div class="last_event_div"> Last Events
                <div class="lastevent_inner">
                    <UserEvents :users='returnUsers'></UserEvents>
                </div>
                <div    class="see_all_div"
                        v-on:click="showall_userevent = !showall_userevent"
                        v-if="users.length > 5">
                    see all User Events
                </div>
            </div>

            <div class="ABC_class" style="display: flex; justify-content: space-between; width: 100%;">
                <PopupMenuOvelay v-if="showall_userevent" @cancel-clicked=cancelClicked>
                    <div v-for="(user, i) in users" :key="i">
                        <ProjectListPopup :user="user"></ProjectListPopup>
                    </div>
                </PopupMenuOvelay>

                <div class="models_div"> Models
                    <div class="undertraining_div">Under Training
                        <div class="undertraining_circle"> {{underTraining}} </div>
                    </div>

                    <div class="model">
                        <div v-for="(model, index) in returnModel" :key="index">
                            <ModelsList :model="model"></ModelsList>
                        </div>
                    </div>
                    <router-link class="see_all_div"
                        v-if="returnModel.length > 4"
                        :to="{ path: returnPath + '/AllModels' }">
                        see all Models
                    </router-link>
                </div>

            <div ref="temp_ref" style="height: max-content; margin-left: 20px;"
                                @mouseenter="tree_upper_layer = !tree_upper_layer"
                                @mouseleave="tree_upper_layer = !tree_upper_layer">
                Label Tree
                <router-link    class="tree_wrapper"
                                :to="{ path : returnPath + '/labeltree' }"
                                style="cursor:pointer"
                                tag="div">
                    <div class="labeltreemap_div">
                        <TreeMiniMap class="labeltree_map" :label='Label'></TreeMiniMap>
                    </div>
                    <div class="upperlayer" v-if="tree_upper_layer"></div>
                </router-link>
            </div>
            </div>

        </div>
        <div class="dataset_wrapper">Datasets
            <TableComponent style="margin-top: 20px;"
                            :columns_array="columns_array"
                            :data_array="$store.getters.RetrieveDataSet"
                            :check_box="$store.state.delete_dataset"
                            @row-click="rowClick"
                            @top-row-click="sortBy"
                            @check-box-emit="checkBoxEmit">
            </TableComponent>

            <ButtonComponent style="padding: 20px "
                             v-if="$store.state.delete_dataset"
                             :confirm="'Delete ('+ buttonText +')'"
                             @cancel-click="cancelClick">
            </ButtonComponent>
        </div>
        <PopupMenuOvelay v-if="$store.state.add_prediction" @cancel-clicked="cancelButtonClicked" :disable_white_background="popup_section">

            <TableComponent v-if="popup_section"
                            :columns_array="columns_array"
                            :data_array="$store.getters.RetrieveDataSet"
                            :check_box="popup_section"
                            @row-click="rowClick"
                            @top-row-click="sortBy"
                            @check-box-emit="checkBoxEmit">
            </TableComponent>

            <ButtonComponent style="padding: 20px; background-color: white;
                                    margin-top: 10px; border-radius: 8px;"
                             v-if="popup_section"
                             :confirm="'Next ('+ buttonText +')'"
                             @confirm-click="popupSection"
                             @cancel-click="cancelButtonClicked">
            </ButtonComponent>

            <AddNewPrediction v-else @cancel-clicked="cancelButtonClicked" >
            </AddNewPrediction>
        </PopupMenuOvelay>
    </div>
</template>

<script>

import UserEvents       from '../MainComponents/UserEvents'
import ModelsList       from '../MainComponents/ModelsList'
import PopupMenuOvelay  from '../CommonComponent/PopupMenu-Ovelay'
import ProjectListPopup from '../CommonComponent/ProjectListPopup'
import AddNewPrediction from '../MainContent/ProjectMainContent componnet/ProjectComponent/datasets/AddNewPrediction'

import TableComponent   from '../CommonComponent/TableComponent'
import ButtonComponent  from '../CommonComponent/ButtonComponent'

import TreeMiniMap      from '../TreeLabelComponents/TreeMiniMap/LabelTreeAppMP'

export default {
    components:{
        UserEvents,
        ModelsList,
        PopupMenuOvelay,
        ProjectListPopup,
        AddNewPrediction,
        TableComponent,
        ButtonComponent,
        TreeMiniMap,
    },
    data(){
        return{

            dataset : null,
            dataset_array : [],

            tree_upper_layer : false,

            popup_section : true,
            showall_userevent: false,
            users : [
                {
                    id              : Math.floor(Math.random()*100000),
                    name            : 'Forat Seif',
                    nick_name       : 'FS',
                    update_notification : 'Has uploaded the pictures',
                    dataset_date    : 'January 2019',
                    project         : 'Squirrel Project',
                    color           : 'green',
                },
                {
                    id              : Math.floor(Math.random()*100000),
                    name            : 'Olav Djupvik',
                    nick_name       : 'OD',
                    update_notification : 'has changed the facade',
                    dataset_date    : 'May 2019',
                    project         : 'Damage V3',
                    color           : 'red',
                },
                {
                    id              : Math.floor(Math.random()*100000),
                    name            : 'Forat Seif',
                    nick_name       : 'FS',
                    update_notification : 'Has uploaded the pictures',
                    dataset_date    : 'June 2019',
                    project         : 'Squirrel Project',
                    color           : 'green',
                },
                {
                    id              : Math.floor(Math.random()*100000),
                    name            : 'Asbjørn Sola',
                    nick_name       : 'AS',
                    update_notification : 'Updated the Pictures',
                    dataset_date    : 'December 2018',
                    project         : 'Horse Project',
                    color           : 'blue',
                },
                {
                    id              : Math.floor(Math.random()*100000),
                    name            : 'Oda Sofie Dahl Eide',
                    nick_name       : 'OE',
                    update_notification : 'Has upload the pictures',
                    dataset_date    : 'january 2019',
                    project         : 'Wolf Project',
                    color           : 'cyan',
                },

            ],
            columns_array: [
                { title : 'Name'      , key : 'name'},
                { title : 'BluePrint' , key : 'blueprint'},
                { title : 'Prediction', key : 'prediction'},
                { title : 'Catagory'  , key : 'category'},
                { title : 'Updated'   , key : 'updated_at', precompute: function(val){
                            var date = new Date(val)
                            var year = date.getUTCFullYear();
                            var month = date.getUTCMonth() + 1;  // months start at zero
                            var day = date.getUTCDate();
                            return day+'.'+month+'.'+year
                        },

                },
                { title : 'Pictures'  , key : 'pictures', value_style: { float: 'right' }, width: '80px' },
                { title : 'Created'   , key : 'created_at', precompute: function(val){
                            var date = new Date(val)
                            var year = date.getUTCFullYear();
                            var month = date.getUTCMonth() + 1;  // months start at zero
                            var day = date.getUTCDate();
                            return day+'.'+month+'.'+year
                        },
                    width: '100px'
                },
                { title : 'By'        , key : 'created_by_name'},
            ],
            Label: [
                {
                    id: 1,
                    name: 'label 1',
                    color: 'red',
                    showchild: true,
                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                    child: [
                        {
                            id: 4,
                            name: 'label 1.1',
                            color: 'yellow',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: []
                        },
                        {
                            id: 5,
                            name: 'label 1.2',
                            color: 'green',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: [
                                {
                                    id: 7,
                                    name: 'label 1.2.1',
                                    color: 'blue',
                                    showchild: true,
                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                    child: [
                                        {
                                            id: 16,
                                            name: 'label 1.2.1.1',
                                            color: 'red',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: [
                                                {
                                                    id: 161,
                                                    name: 'label 1.2.1.1.1',
                                                    color: 'red',
                                                    showchild: true,
                                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                    child: [
                                                        {
                                                            id: 1611,
                                                            name: 'label 1.2.1.1.1.1',
                                                            color: 'red',
                                                            showchild: true,
                                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                            child: [
                                                                {
                                                                    id: 16111,
                                                                    name: 'label 1.2.1.1.1.1.1',
                                                                    color: 'red',
                                                                    showchild: true,
                                                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                                    child: [
                                                                        {
                                                                            id: 162,
                                                                            name: 'label 1.2.1.1',
                                                                            color: 'red',
                                                                            showchild: true,
                                                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                                            child: [
                                                                                {
                                                                                    id: 1211,
                                                                                    name: 'label 1.2.1.1',
                                                                                    color: 'red',
                                                                                    showchild: true,
                                                                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                                                    child: []
                                                                                },
                                                                            ]
                                                                        },
                                                                    ]
                                                                },
                                                            ]
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            id: 17,
                                            name: 'label 1.2.1.2',
                                            color: 'blue',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        },
                                        {
                                            id: 21,
                                            name: 'label 1.2.1.3',
                                            color: 'green',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        },
                                        {
                                            id: 22,
                                            name: 'label 1.2.1.4',
                                            color: 'blue',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        },
                                        {
                                            id: 23,
                                            name: 'label 1.2.1.5',
                                            color: 'purple',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: [
                                                {
                                                    id: 12151,
                                                    name: 'label 1.2.1.5.1',
                                                    color: 'black',
                                                    showchild: true,
                                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                    child: []
                                                },
                                            ]
                                        },
                                        {
                                            id: 24,
                                            name: 'label 1.2.1.6',
                                            color: 'gray',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        },
                                        {
                                            id: 25,
                                            name: 'label 1.2.1.7',
                                            color: 'blue',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        },
                                        {
                                            id: 26,
                                            name: 'label 1.2.1.8',
                                            color: 'blue',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        },
                                        {
                                            id: 27,
                                            name: 'label 1.2.1.9',
                                            color: 'blue',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        },
                                        {
                                            id: 28,
                                            name: 'label 1.2.1.10',
                                            color: 'blue',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        },
                                        {
                                            id: 29,
                                            name: 'label 1.2.1.11',
                                            color: 'red',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        },
                                        {
                                            id: 30,
                                            name: 'label 1.2.1.12',
                                            color: 'white',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        }
                                    ]
                                },
                                {
                                    id: 8,
                                    name: 'label 1.2.2',
                                    color: 'Red-violet',
                                    showchild: true,
                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                    child: [
                                        {
                                            id: 10,
                                            name: 'label 1.2.2.1',
                                            color: 'cyan',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: [
                                                {
                                                    id: 31,
                                                    name: 'label 1.2.2.1.1',
                                                    color: 'cyan',
                                                    showchild: true,
                                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                    child: [
                                                        {
                                                            id: 122111,
                                                            name: 'label 1.2.2.1.1.1',
                                                            color: 'yellow',
                                                            showchild: true,
                                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                            child: [
                                                                {
                                                                    id: 1221111,
                                                                    name: 'label 1.2.2.1.1.1.1',
                                                                    color: 'blue',
                                                                    showchild: true,
                                                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                                    child: []
                                                                },
                                                            ]
                                                        },
                                                        {
                                                            id: 122112,
                                                            name: 'label 1.2.2.1.1.2',
                                                            color: 'yellow',
                                                            showchild: true,
                                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                            child: []
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 12212,
                                                    name: 'label 1.2.2.1.2',
                                                    color: 'yellow',
                                                    showchild: true,
                                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                    child: []
                                                }
                                            ]
                                        },
                                        {
                                            id: 11,
                                            name: 'label 1.2.2.2',
                                            color: 'orange',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: [
                                                {
                                                    id: 12221,
                                                    name: 'label 1.2.2.2.1',
                                                    color: 'orange',
                                                    showchild: true,
                                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                    child: [
                                                        {
                                                            id: 122211,
                                                            name: 'label 1.2.2.2.1.1',
                                                            color: 'green',
                                                            showchild: true,
                                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                            child: []
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            id: 12,
                                            name: 'label 1.2.2.3',
                                            color: 'brown',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        }
                                    ]
                                },
                                {
                                    id: 9,
                                    name: 'label 1.2.3',
                                    color: 'black',
                                    showchild: true,
                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                    child: []
                                }
                            ]
                        }
                    ],
                },
                {
                    id: 2,
                    name: 'label 2',
                    color: 'purple',
                    showchild: true,
                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                    child: []
                },
                {
                    id: 3,
                    name: 'label 3',
                    color: 'Emerald',
                    showchild: true,
                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                    child: [
                        {
                            id: 6,
                            name: 'label 3.1',
                            color: 'Coral',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: [
                                {
                                    id: 13,
                                    name: 'label 3.1.1',
                                    color: 'Gray',
                                    showchild: true,
                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                    child: []
                                },
                                {
                                    id: 14,
                                    name: 'label 3.1.2',
                                    color: 'Indigo',
                                    showchild: true,
                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                    child: [
                                        {
                                            id: 31,
                                            name: 'label 3.1.2.1',
                                            color: 'Gray',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: []
                                        },
                                        {
                                            id: 32,
                                            name: 'label 3.1.2.2',
                                            color: 'Indigo',
                                            showchild: true,
                                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                            child: [
                                                {
                                                    id: 33,
                                                    name: 'label 3.1.2.2.1',
                                                    color: 'Indigo',
                                                    showchild: true,
                                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                    child: []
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    id: 15,
                                    name: 'label 3.1.3',
                                    color: 'Pink',
                                    showchild: true,
                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                    child: []
                                }
                            ]
                        },
                        {
                            id: 18,
                            name: 'label 3.2',
                            color: 'yellow',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: []
                        },
                        {
                            id: 19,
                            name: 'label 3.3',
                            color: 'green',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: []
                        },
                        {
                            id: 20,
                            name: 'label 3.4',
                            color: 'blue',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: []
                        }
                    ]
                },
                {
                    id: 4,
                    name: 'label 4',
                    color: 'red',
                    showchild: true,
                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                    child:[
                        {
                            id: 41,
                            name: 'label 4.1',
                            color: 'purple',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: []
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'label 5',
                    color: 'purple',
                    showchild: true,
                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                    child: [
                        {
                            id: 51,
                            name: 'label 5.1',
                            color: 'purple',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: [
                                {
                                    id: 511,
                                    name: 'label 5.1.1',
                                    color: 'yellow',
                                    showchild: true,
                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                    child: []
                                },
                                {
                                    id: 512,
                                    name: 'label 5.1.2',
                                    color: 'green',
                                    showchild: true,
                                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                    child: []
                                }
                            ]
                        },
                        {
                            id: 52,
                            name: 'label 5.2',
                            color: 'silver',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: []
                        },
                        {
                            id: 53,
                            name: 'label 5.3',
                            color: 'cyan',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: []
                        }
                    ]
                },
                {
                    id: 6,
                    name: 'label 6',
                    color: 'Emerald',
                    showchild: true,
                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                    child:[
                        {
                            id: 61,
                            name: 'label 6.1',
                            color: 'Coral',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: []
                        },
                        {
                            id: 62,
                            name: 'label 6.2',
                            color: 'blue',
                            showchild: true,
                            tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                            description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                            child: []
                        }
                    ]
                },
                {
                    id: 7,
                    name: 'label 7',
                    color: 'lightgreen',
                    showchild: true,
                    tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                    description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                    child: []
                },
			],
        }
    },
    mounted(){
        //Display Users TRUE on Top Nav Bar
        this.$store.dispatch('setUserComponentVisibility', true)

        //Updating the path track in Vuex
        this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)

        //Update Project in Vuex
        //this.returnProject
        this.dataset = this.returnDataset

        this.get_bounding_box = this.$refs['temp_ref'].getBoundingClientRect()
    },
    computed: {
        getHeight: function(){
            if( this.get_bounding_box ){
                var h = window.innerHeight - 167
                return h * 0.15 + 'px'
            }
            else
                return 0 + 'px'
        },
        returnPath: function(){
            return this.$route.path
        },
        returnState : function(){
            return this.$store.state.add_prediction
        },
        returnDataset : function(){
            return this.$store.getters.RetrieveDataSet
        },
        returnProject: function(){

            var proj_id = this.$router.currentRoute.params.user_id
            var proj_list = this.$store.getters.doneFetchingProjects

            for(var i=0; i< proj_list.length-1 ;i++ ){
                if(proj_list[i].id == proj_id)
                    this.$store.dispatch('updatingSingleProject', proj_list[i])
            }
        },
        shrinkScreen: function(){
            return this.$store.state.shrink_screen
        },
        underTraining: function(){
            var i = 0
            for (let index = 0; index < this.returnModel.length; index++) {
                if(this.returnModel[index].under_training)
                    i++
            }
            return i
        },
        buttonText: function(){

            return  this.dataset_array.length
        },

        returnModel: function(){
            return this.$store.getters.RetrieveModels
        },

        returnUsers: function(){
            let l = this.users.length
            if(l<5){
                for(let i=0; i<5-l; i++)
                    this.users.push(null)
                return this.users
            }
            else
                return this.users
        },

    },
    methods: {



        NextClick: function(){

        },
        cancelClicked: function(bool){
            this.showall_userevent = bool
        },
        cancelClick: function(){
            this.dataset_array = []
            this.$store.commit("toggleDeleteDataset")
        },
        cancelClick: function(){
            this.dataset_array = []
            this.$store.commit("toggleDeleteDataset")
        },

        checkBoxEmit: function(dataset_obj, ischeck){
            if(ischeck)
                this.dataset_array.push(dataset_obj)
            else{
                for( var j = 0; j < this.dataset_array.length; j++){
                    if ( this.dataset_array[j] === dataset_obj)
                        this.dataset_array.splice(j, 1)
                }
            }
        },
        rowClick: function( i ){
            let id = i.id
            this.$router.push({ path : this.$route.path + '/datasets/'+id })

        },
        sortBy: function(title){
            console.log(title)
        },
        cancelButtonClicked: function(Events){
            this.$store.commit('toggleAddPrediction')
            this.popup_section =true
        },
        popupSection: function(){
            this.popup_section = false
        }
    }

}
</script>

<style scoped>
.project_wrapper{
    color           : #14253c;;
    font-weight     : 600;
    font-size       : 13px;
}
.span_wrapper_div{
    display         : flex;
    margin-bottom   : 35px;
    margin-top      : 10px;
}
.last_event_div{
    min-width: 35%;
    padding-right   : 30px;

}
.lastevent_inner{
    height          : 385px;
    overflow        : hidden;
    margin-top      : 27px;
    border-radius   : 20px;
    border          : 1px solid #ccc;
    background-color: #ffffff;
    margin-bottom   : 10px;
}
.lastevent_inner:hover{
    /* background-color: #f7f7f7; */
    border: solid 1px #b9b9b9;
}
.models_wrapper_div{
    display         : flex;
}
.see_all_div{

    font-size: 13px;
    color: #65768f;
    text-decoration-line: underline;
    margin-right: 20px;
}
.see_all_div:hover{
    cursor: pointer;
    color:#14253c
}
.models_div{
    max-width       : 55%;
    height          : 470px;
    overflow        : hidden;
}
.undertraining_div{
    font-size       : 13px;
    line-height     : 18px;
    font-weight     : normal;
    color           : #65768f;
    display         : flex;
}
.undertraining_circle{
    margin-left     : 5px;
    width           : 15px;
    height          : 11px;
    padding-bottom  : 5px;
    background-color: #103368;
    color           : white;
    text-align      : center;
    font-size       : 9px;
    border-radius   : 10px;
}
.model{
    display         :flex;
    flex-wrap       : wrap
}
.dataset_wrapper{
    margin-top: 32px;
    margin-bottom: 32px;
    margin-right: 10px;
}
.tree_wrapper{
    width: 250px;
    height: 120px;
    background-color: #fff;
    margin: 28px 10px 10px 0px;
    padding: 20px;
    border-radius: 20px;
    border: solid 1px #cecece;
    position: relative;
    overflow: hidden;
}
.tree_wrapper:hover{
    background-color: #f7f7f7;
    border: solid 1px #b9b9b9;

}
.labeltreemap_div{
    height          : 120px;
    overflow        : hidden;
}
.labeltree_map{
    transform: scale(0.15);
    transform-origin: top left;
    height: calc(100% * 0.15 );
}
.overlay_div{
    width: 100%;
    height: 150px;
    background-color:rgba(255, 192, 203, 0.557);
    position: absolute;
    left: 0px;
    cursor: pointer;
}
.layer_div{
    position: absolute;
    width: 100%;
    height:100%;
    top: 0px;
}
.upperlayer{
    width: 100%;
    height: 100%;
    background-color: #b9b9b908;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #1b204ec2;
    font-size: 20px;
}
</style>
