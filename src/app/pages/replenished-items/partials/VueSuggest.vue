<template>
    <div class="vue-suggest">
        <div class="wrapper">
            <ValidationProvider
                :rules="rules"
                name="state"
                v-slot="{ errors }">
                <input :class="['qty contenteditable', errors && errors[0] ? 'was-invalid' : '']"
                v-model="state"
                name="state"
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
            <div v-if="listItems && isActive">
                <ul class="list list-unstyled">
                    <li :class="['list-item', { 'list-item-active': index === cursor }]" v-for="(item, index) in listItems" 
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

    .list .list-item {
        padding: 0.4rem 0.7rem;
        cursor: pointer;
        border: 1px solid #858796;
    }
</style>

<script>
export default {
    name: 'vue-suggest',

    props: [ "suggestedList", "cleanInput", "errors", "rules"],

    data() {
        return {
            cursor: 0,
            state: "",
            isActive: false,
            listItems: []
        }
    },

    watch: {
        suggestedList(value) {
            if(value && this.state) this.listItems = this.suggestedList.filter(item => item.name.toLowerCase().includes(this.state.toLowerCase()));
        },
        cleanInput(value) {
            if(value) this.state = "";
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

        focus() {
            return this.$emit('focus');
        },

        onSelect(item) {
            // your search method
            this.setState(item.name);
            this.$emit('onSelect', item);
            this.cursor = 0;
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

        // $(document).ready(function() {
        //     /** Prevent auto complete */
        //     $("input[name='state']").attr('autocomplete', 'new-password');
        // })
    }
}
</script>