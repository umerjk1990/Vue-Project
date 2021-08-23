import Vue from 'vue'

Vue.directive('focus-ref-on-create', {
    bind: function(el, binding, vnode) {
        //console.log("focuing", binding.value)
        Vue.nextTick(() => {
            if(binding.value || typeof binding.value == 'undefined'){
                var inp = vnode.context.$refs[binding.arg];
                //console.log("inp:", inp)
                if(Array.isArray(inp)){
                    //focus on input
                    inp[0].focus()
                    //select all text
                    inp[0].setSelectionRange(0, inp[0].value.length)
                }
                else if(inp){
                    //focus on input
                    inp.focus()
                    //select all text
                    inp.setSelectionRange(0, inp.value.length)
                }
            }
        })
    }
})
Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
      this.event = function (event) {
        if (!(el == event.target || el.contains(event.target))) {
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', this.event)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', this.event)
    },
});
