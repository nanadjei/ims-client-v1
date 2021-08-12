<template>
    <div class="vue-suggest">
        <div class="wrapper">
            <ValidationProvider
                :rules="rules"
                name="state"
                v-slot="{ errors }">
                <input :class="['qty contenteditable', errors && errors[0] ? 'was-invalid' : '']"
                v-model="state"
                @input="emitInputChange"
                min="2"
                max="12"
                @focus="focus"
                :suggestedList="suggestedList"
                @keydown.up.prevent="keyUp"
                @keydown.down.prevent="keyDown"
                @keydown.enter.prevent="keyEnter"
                autocomplete="off"
            />
            </ValidationProvider>
            <div class="list-dropdown" v-if="suggestedList && isActive">
                <ul id="items-list" class="list list-unstyled">
                    <li :id="`item-${index}`" :class="['list-item', { 'list-item-active': index === cursor }]" v-for="(item, index) in suggestedList" 
                        :key="index"
                        @click="onSelect(item)"
                    >
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped lang="css">
    .contenteditable {
        color: #858796 !important;
        border: none !important;
        width: 100%;
    }
    
    .was-invalid {
        border: 1px solid #dc3545 !important;
    }

    .wrapper {
        position: relative;
    }

    .list .list-item {
        padding: 0.4rem 0.7rem;
        cursor: pointer;
        border: 1px solid #858796;
    }

    /* .list.list-unstyled {
        max-height: 80px;
        overflow-y: scroll;   
    } */

    .list-dropdown {
        position: absolute;
        z-index: 3;
        width: 100%;
        background-color: #fff;
        max-height: 80px;
        overflow-y: auto;
    }
</style>

<script>
export default {
    name: 'vue-suggest',

    props: [ "suggestedList", "cleanInput", "errors", "setValue", "rules" ],

    data() {
        return {
            cursor: 0,
            state: this.setValue,
            isActive: false
        }
    },

    watch: {
        suggestedList(value) {
            if(value && this.state) this.suggestedList = this.suggestedList.filter(item => item.name.toLowerCase().includes(this.state.toLowerCase()));
        },
        cleanInput(value) {
            if(value) this.state = "";
        },
        // state(value) {
        //     if(!value) this.suggestedList = []; this.suggestedList = [];
        // },
        setValue(value) {
            return this.state = value;
        },
        suggestedList(value) {  
            if(value.length && this.isActive === true) this.onActiveItem(value[this.cursor]);
        },
        cursor(value) {
            return this.onActiveItem(this.suggestedList[value]);
        }
    },

    methods: {
        emitInputChange(){
            if(this.state) {
                this.isActive = true;
                return this.$emit('onInputChange', this.state);
            }
            return this.isActive = false;
        },

        setState(state) {
            this.state = state;
            return this.isActive = false;
        },

        onActiveItem(item) {
            return this.$emit('onActiveItem', item);
        },

        focus() {
            this.suggestedList.length && this.isActive === true;
            return this.$emit('focus');
        },

        onSelect(item) {
            /** If item has finished do nothing. */
            if(item.quantity_remaining === 0) return;
            
            this.setState(item.name);
            this.onActiveItem(item);
            return this.$emit('onSelect', item);
        },

        /** Navigations */
        keyUp() {
            this.$emit('key-up', this.state);
            if (this.cursor > 0) {
                this.cursor -= 1;
            }
        },
        keyDown() {
            this.$emit('key-down', this.state);
            if ((this.isActive) && (this.suggestedList.length && this.cursor < this.suggestedList.length - 1)) {
                this.cursor += 1;
            }
        },
        keyEnter() {
            const targetListItem = this.suggestedList[this.cursor];
            /** If item has finished do nothing. */
            if(targetListItem.quantity_remaining === 0) return;

            if (this.isActive && targetListItem) {
                this.state = targetListItem.name;
                this.isActive = false;
            }
            return this.$emit('onSelect', targetListItem);
            },
        },
        

    created() {
        window.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)){
            this.isActive = false
            }
        })
    }
}
</script>