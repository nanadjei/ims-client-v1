<template>
   <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="for-confirm"
      aria-hidden="true">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content scrollable-content">
          <div class="modal-header">
            <h5 class="modal-title" id="for-confirm">{{ !title ? "Are you sure you want to perform this action?" : title }}</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body" v-show="$slots.default">
            <!-- Content here -->
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" @click="submit" class="btn" :class="submitBtnClass" :disabled="isLoading || disabled">
              <i v-show="isLoading" class="fas fa-spinner fa-spin fa-spin"></i>
              {{ submitBtnName ? submitBtnName : "Submit" }}
              </button>
          </div>
        </div>
      </div>
    </div> 
</template>
<script>
export default {
  name: "AppModal",
  props: ["title", "submitBtnClass", "submitBtnName", "modalId", "disabled"],
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    show() {
      window.$(`#${this.modalId}`).modal("show");
    },
    submit() {
      this.isLoading = !this.isLoading;
      return this.$emit("onSubmit");
    },
    close() {
      this.isLoading = !this.isLoading;
      window.$(`#${this.modalId}`).modal("hide");
    }
  }
};
</script>