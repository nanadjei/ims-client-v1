
export default {
    methods: {
        /** Call inventory modal */
        triggerInventoryModal() {
            window.$("#inventory-modal").modal("show");
            setTimeout(function () {
                $("#search-input").focus();
            }, 600);
        },
    }
};