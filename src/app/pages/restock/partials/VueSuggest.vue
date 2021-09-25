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
            <div class="list-dropdown" v-if="listItems && isActive">
                <ul id="items-list" class="list list-unstyled">
                    <li :id="`item-${index}`" :class="['list-item', { 'list-item-active': index === cursor }]" v-for="(item, index) in listItems" 
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

    /* .list .list-unstyled {
        
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
import { ifRouteIs } from "@/app/helpers/app";
export default {
    name: 'vue-suggest',

    props: [ "suggestedList", "cleanInput", "errors", "setValue", "rules" ],

    data() {
        return {
            cursor: 0,
            state: this.setValue,
            isActive: false,
            listItems: []
        }
    },

    watch: {
        suggestedList(value) {
            if(value && this.state) this.listItems = 
            this.suggestedList.filter(item => item.name.toLowerCase().includes(this.state.toLowerCase()));
        },
        cleanInput(value) {
            if(value) this.state = "";
        },
        setValue(value) {
            return this.state = value;
        },
        listItems(value) {  
            if(value.length && this.isActive === true) this.onActiveItem(value[this.cursor]);
        },
        cursor(value) {
            return this.onActiveItem(this.listItems[value]);
        }
    },

    methods: {
        emitInputChange(){
            if(this.state) {
                this.cursor = 0;
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
            return this.$emit('focus');
        },

        onSelect(item) {
             /** If item has finished do nothing. */
            if(item.quantity_remaining === 0 && this.ifRouteIs('cash-sales')) return;
            this.setState(item.name);
            this.onActiveItem(item);
            this.$emit('onSelect', item);
            return this.cursor = 0;
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
            if ((this.isActive) && (this.listItems.length && this.cursor < this.listItems.length - 1)) {
                this.cursor += 1;
            }
        },
    keyEnter() {
        const targetListItem = this.listItems[this.cursor];
        /** If item has finished do nothing. */
        if(targetListItem.quantity_remaining === 0 && this.ifRouteIs('cash-sales')) return;

        if (this.isActive && targetListItem) {
            this.state = targetListItem.name;
            this.isActive = false;
        }
        return this.$emit('onSelect', targetListItem);
        },

        ifRouteIs(routeName) {
            return ifRouteIs(routeName);
        }
    },
    created() {
        window.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)){
            this.isActive = false
            }
        })

        // $(document).ready(function() {
        //     /** Prevent auto complete */
        //     $("input[name='state']").attr('autocomplete', 'new-password');
        // })
    }
}
</script>