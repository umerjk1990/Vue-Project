<template>
<div class="tep_div" ref="temp_ref" @mousemove="templateMouseMove" @mouseup="templateMouseUp">
    <div class="top_bar_div" :style="returnWidth">
        <div style="color: #14253c; font-weight: 600; font-size: 16px;">Relationship</div>
        <div style="display: flex">
            <div class="button undo" v-on:click="unDo()">Undo</div>
            <div class="button redo" v-on:click="reDo()">Redo</div>
        </div>
    </div>
    <div class="usercomponent_div">
       <!--  <div>Relationship</div> -->
        <LabelTreeApp   @label="label"
                        @label-select="label_select"
                        @reset-redo-undo="resetRedoUndo"
                        @row-shrink='rowShrink'
                        @right-bar='rightBar'
                        :redo_undo_click="redo_undo_click"
                        :label="Label">
        </LabelTreeApp>
    </div>
    <RightBar :noti="noti" :hide_bar='rightbar_hide' @is-hide="isHide">
        <div class="rightbar_wrapper">
            <div class="top_wrapper">
                <div v-if="label_array.length == 0" class="category_div">
                    Click on Label to see information...
                </div>
                <div v-else>
                    <div class="category_div">Category</div>
                    <LabelDescription   v-for="(label, index) in returnLabelArray"
                                        :key="index"
                                        :label="label"
                                        style="padding-bottom: 10px;">
                    </LabelDescription>
                </div>
            </div>
            <div class="labeltree_wrapper" ref="labeltree_wrapper_ref">

                <LabelTreeAppMP class="labeltree_map"
                                :label='Label'
                                :row_shrink='returnRowShrink'>
                </LabelTreeAppMP>


                <div class="layer_div">
                    <div    class="overlay_div"
                            @mouseup="mouseUp"
                            @mousedown="mouseDown"
                            @mousemove="templateMouseMove"
                            @mouseleave="mouseLeave"
                            :style="{   height : getHeight,
                                        top : (map_top*0.15)  + 'px'}"
                            ref="overlay_ref">
                    </div>
                </div>
            </div>
        </div>
    </RightBar>
</div>
</template>

<script>
import RightBar         from '../CommonComponent/RightBar'
import LabelTreeApp     from '../TreeLabelComponents/LabelTreeApp'
import LabelDescription from '../TreeLabelComponents/LabelDescription'
import LabelTreeAppMP   from '../TreeLabelComponents/TreeMiniMap/LabelTreeAppMP'
    export default {
        components: {
            RightBar,
            LabelTreeApp,
            LabelDescription,
            LabelTreeAppMP
        },
        props:{
        },
        data(){
            return{
                row_shrink: [],

                label_data: null,
                label_array: [],
                redo_undo_click: '',

                mouse_down: false,

                top_of_win: 0,
                top_of_map: 0,
                off_set: 0,
                vh: 0,
                get_bounding_box: null,

                map_top: -1,
                move: 0,

                mouse_down_point: 0,
                mouse_down_scroll: 0,
                inner : 0,

                noti : false,
                rightbar_hide: false,
                rightbar_prev_hide : false,

                Label: [
                    {
                        id: Math.floor(Math.random()*100000),
                        name: 'label 1',
                        color: 'red',
                        showchild: true,
                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                        child: [
                            {
                                id: Math.floor(Math.random()*100000),
                                name: 'label 1.1',
                                color: 'yellow',
                                showchild: true,
                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                child: []
                            },
                            {
                                id: Math.floor(Math.random()*100000),
                                name: 'label 1.2',
                                color: 'green',
                                showchild: true,
                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                child: [
                                    {
                                        id: Math.floor(Math.random()*100000),
                                        name: 'label 1.2.1',
                                        color: 'blue',
                                        showchild: true,
                                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                        child: [
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.1',
                                                color: 'red',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: [
                                                    {
                                                        id: Math.floor(Math.random()*100000),
                                                        name: 'label 1.2.1.1.1',
                                                        color: 'red',
                                                        showchild: true,
                                                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                        child: [
                                                            {
                                                                id: Math.floor(Math.random()*100000),
                                                                name: 'label 1.2.1.1.1.1',
                                                                color: 'red',
                                                                showchild: true,
                                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                                child: [
                                                                    {
                                                                        id: Math.floor(Math.random()*100000),
                                                                        name: 'label 1.2.1.1.1.1.1',
                                                                        color: 'red',
                                                                        showchild: true,
                                                                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                                        child: [
                                                                            {
                                                                                id: Math.floor(Math.random()*100000),
                                                                                name: 'label 1.2.1.1',
                                                                                color: 'red',
                                                                                showchild: true,
                                                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                                                child: [
                                                                                    {
                                                                                        id: Math.floor(Math.random()*100000),
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
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.2',
                                                color: 'blue',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: []
                                            },
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.3',
                                                color: 'green',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: []
                                            },
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.4',
                                                color: 'blue',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: []
                                            },
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.5',
                                                color: 'purple',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: [
                                                    {
                                                        id: Math.floor(Math.random()*100000),
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
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.6',
                                                color: 'gray',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: []
                                            },
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.7',
                                                color: 'blue',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: []
                                            },
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.8',
                                                color: 'blue',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: []
                                            },
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.9',
                                                color: 'blue',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: []
                                            },
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.10',
                                                color: 'blue',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: []
                                            },
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.1.11',
                                                color: 'red',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: []
                                            },
                                            {
                                                id: Math.floor(Math.random()*100000),
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
                                        id: Math.floor(Math.random()*100000),
                                        name: 'label 1.2.2',
                                        color: 'Red-violet',
                                        showchild: true,
                                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                        child: [
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.2.1',
                                                color: 'cyan',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: [
                                                    {
                                                        id: Math.floor(Math.random()*100000),
                                                        name: 'label 1.2.2.1.1',
                                                        color: 'cyan',
                                                        showchild: true,
                                                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                        child: [
                                                            {
                                                                id: Math.floor(Math.random()*100000),
                                                                name: 'label 1.2.2.1.1.1',
                                                                color: 'yellow',
                                                                showchild: true,
                                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                                child: [
                                                                    {
                                                                        id: Math.floor(Math.random()*100000),
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
                                                                id: Math.floor(Math.random()*100000),
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
                                                        id: Math.floor(Math.random()*100000),
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
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 1.2.2.2',
                                                color: 'orange',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: [
                                                    {
                                                        id: Math.floor(Math.random()*100000),
                                                        name: 'label 1.2.2.2.1',
                                                        color: 'orange',
                                                        showchild: true,
                                                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                        child: [
                                                            {
                                                                id: Math.floor(Math.random()*100000),
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
                                                id: Math.floor(Math.random()*100000),
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
                                        id: Math.floor(Math.random()*100000),
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
                        id: Math.floor(Math.random()*100000),
                        name: 'label 2',
                        color: 'purple',
                        showchild: true,
                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                        child: []
                    },
                    {
                        id: Math.floor(Math.random()*100000),
                        name: 'label 3',
                        color: 'Emerald',
                        showchild: true,
                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                        child: [
                            {
                                id: Math.floor(Math.random()*100000),
                                name: 'label 3.1',
                                color: 'Coral',
                                showchild: true,
                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                child: [
                                    {
                                        id: Math.floor(Math.random()*100000),
                                        name: 'label 3.1.1',
                                        color: 'Gray',
                                        showchild: true,
                                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                        child: []
                                    },
                                    {
                                        id: Math.floor(Math.random()*100000),
                                        name: 'label 3.1.2',
                                        color: 'Indigo',
                                        showchild: true,
                                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                        child: [
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 3.1.2.1',
                                                color: 'Gray',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: []
                                            },
                                            {
                                                id: Math.floor(Math.random()*100000),
                                                name: 'label 3.1.2.2',
                                                color: 'Indigo',
                                                showchild: true,
                                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                                child: [
                                                    {
                                                        id: Math.floor(Math.random()*100000),
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
                                        id: Math.floor(Math.random()*100000),
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
                                id: Math.floor(Math.random()*100000),
                                name: 'label 3.2',
                                color: 'yellow',
                                showchild: true,
                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                child: []
                            },
                            {
                                id: Math.floor(Math.random()*100000),
                                name: 'label 3.3',
                                color: 'green',
                                showchild: true,
                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                child: []
                            },
                            {
                                id: Math.floor(Math.random()*100000),
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
                        id: Math.floor(Math.random()*100000),
                        name: 'label 4',
                        color: 'red',
                        showchild: true,
                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                        child:[
                            {
                                id: Math.floor(Math.random()*100000),
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
                        id: Math.floor(Math.random()*100000),
                        name: 'label 5',
                        color: 'purple',
                        showchild: true,
                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                        child: [
                            {
                                id: Math.floor(Math.random()*100000),
                                name: 'label 5.1',
                                color: 'purple',
                                showchild: true,
                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                child: [
                                    {
                                        id: Math.floor(Math.random()*100000),
                                        name: 'label 5.1.1',
                                        color: 'yellow',
                                        showchild: true,
                                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                        child: []
                                    },
                                    {
                                        id: Math.floor(Math.random()*100000),
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
                                id: Math.floor(Math.random()*100000),
                                name: 'label 5.2',
                                color: 'silver',
                                showchild: true,
                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                child: []
                            },
                            {
                                id: Math.floor(Math.random()*100000),
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
                        id: Math.floor(Math.random()*100000),
                        name: 'label 6',
                        color: 'Emerald',
                        showchild: true,
                        tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                        description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                        child:[
                            {
                                id: Math.floor(Math.random()*100000),
                                name: 'label 6.1',
                                color: 'Coral',
                                showchild: true,
                                tags: ['Skader', 'Hunkjønn', 'Hankjønn', 'Planteeter'],
                                description: 'Also called Siberian Stripe Grain or burunduk. 13-17 cm kang body and 8-11 cm long tail. Five black-brown spots on the back and four bright stripes.',
                                child: []
                            },
                            {
                                id: Math.floor(Math.random()*100000),
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
                        id: Math.floor(Math.random()*100000),
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
        watch:{
            returnLabelArray: function(){
                if(this.label_array.length != 0){
                    this.label_data = null

                }
                this.noti = true
                setTimeout( () => {

                    this.noti = false
                }, 100);

            },
            row_shrink: function(){
            }
        },
        created () {
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('keydown', this.handleKeyDown);
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll  );
            window.removeEventListener('keydown', this.handleKeyDown);
        },
        mounted() {
            this.get_bounding_box = this.$refs['temp_ref'].getBoundingClientRect()
            console.log('Router : ', this.$router.currentRoute)
            this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)
        },
        computed:{
            labelVueX: function(){
                console.log('Route : ',this.$route)
                console.log('Router : ',this.$router.currentRoute.path)
                let label = this.$route.query.Label
                if(label.length == 0){
                    //read from the Vuex Store
                    console.log('length is 0')
                    label = []
                }
                else if(typeof this.label[0] != Object){
                    //read from the vuex store
                    console.log('is not Object : ', this.label)
                    label = []
                }

                console.log('label : ',label)
                return label
            },
            returnRowShrink: function(){
                return this.row_shrink
            },
            returnWidth: function(){
                if(!this.rightbar_hide){
                    return { 'width' : 'calc(100vw - 600px)' }
                }
                else{
                    return { 'width' : 'calc(100vw - 270px)' }
                }
            },
            getHeight: function(){
                if( this.get_bounding_box ){

                    var h = window.innerHeight - 167
                    return h * 0.15 + 'px'
                }
                else
                    return 0 + 'px'
            },
            returnLabelArray: function(){
                console.log('Labe Array : ', this.label_array)
                return this.label_array
                //let array = []
                //for (let i = 0; i < this.label_array.length; i++) {
                //    if(this.label_array[i].label === undefined) array.push(this.label_array[i])
                //    else array.push(this.label_array[i].label)
//
                //}
                //return array
            },
        },
        methods:{
            rightBar: function( bool ){

                if(bool && !this.rightbar_prev_hide && !this.rightbar_hide){

                    this.rightbar_prev_hide = true
                    this.rightbar_hide = this.rightbar_prev_hide
                }

                if(!bool && this.rightbar_prev_hide && this.rightbar_hide){

                    this.rightbar_prev_hide = false
                    this.rightbar_hide = this.rightbar_prev_hide
                }
            },
            rowShrink: function(row_shrink){
                this.row_shrink = row_shrink
            },
            isHide: function(ishide){
                this.rightbar_hide = ishide
            },
            handleScroll: function(){
                this.map_top = window.scrollY
            },
            handleKeyDown: function(e){
                if(e.ctrlKey && e.keyCode == 90)
                    this.redo_undo_click = 'undo'
                else if(e.ctrlKey && e.keyCode == 89)
                    this.redo_undo_click = 'redo'
            },
            label: function(label){
                this.label_data = label
            },
            label_select: function(label_array){
                console.log('Emit : ', label_array)
                this.label_array = []
                this.label_array = label_array
            },
            reDo: function(){
                this.redo_undo_click = 'redo'
            },
            unDo: function(){
                this.redo_undo_click = 'undo'
            },
            resetRedoUndo: function(){
                this.redo_undo_click = ''
            },
            mouseEnter: function(e){
            },
            mouseLeave: function(){
            },
            mouseDown: function(e){
                let doc = document.documentElement;

                this.mouse_down = true
                this.mouse_down_point = e.y
                this.mouse_down_scroll = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
                //this.mouse_down_point = e.pageY
            },
            mouseUp: function(){
                this.mouse_down = false
            },
            templateMouseMove: function(e){
                if(this.mouse_down){
                    let dy = e.y - this.mouse_down_point;
                    let t_height = 300
                    let height = this.$refs['overlay_ref'].style.height
                    let top = this.$refs['overlay_ref'].style.top

                    height = parseInt(height, 10)
                    top = parseInt(top, 10)

                    window.scrollTo(0, this.mouse_down_scroll + dy * 6.6)
                    this.$refs['labeltree_wrapper_ref'].scrollTop = top * 0.85
                }
            },
            templateMouseUp: function(){
                this.mouse_down = false
            }
        },
    }
</script>

<style scoped>
.usercomponent_div{
    height: 100%;
    display: flex;

}
.top_bar_div{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.relationship_div{
    width: 100%;
    height: 100%;
}
.category_div{
    font-size: 16px;
}
.tags_wrapper_div{
    width: 85%;
    height: 40px;
    background-color: #1b204e;
    color:white;
    font-size: 13px;
    line-height: 40px;
    padding-left: 20px;
    margin-top: 10px;
}
.button.undo{
    font-size: 16px;
    padding: 10px;
    cursor: pointer;
}
.button:hover{
    text-decoration-line: underline;
}
.button.redo{
    font-size: 16px;
    padding: 10px;
    cursor: pointer;
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
.rightbar_wrapper{
    height: calc(100vh - 167px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.labeltree_wrapper{
    height: 300px;
    position: relative;
    margin-bottom: 20px;
    overflow-x: hidden;
}
.map_wrapper_div{
    width: 250px;
    height: 120px;
    background-color: #fff;
    margin: 10px 10px 10px 0px;
    border: solid 1px #cecece;
    padding: 20px 20px 20px 20px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: normal;
    color:#5a5a5a;

    overflow-x: hidden;

}
.top_wrapper{
    height: calc(100% - 300px);
    overflow: auto;
    margin-bottom: 32px;
    border-bottom: 1px solid gray;
    overflow-x: hidden;
}
.labeltree_map{
    transform: scale(0.15);
    transform-origin: top left;
    height: calc(100% * 0.15 );
}
</style>