<template>
    <div class="card shadow mb-4 make-sticky">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Item Details</h6>
        </div>
        <div class="card-body">
            <p>Name: {{ item.name }}</p>
            <p>Quantity: <span v-if="ifItemUnavailable" class="badge badge-danger">Out of Stock</span> <span v-else>{{ item.quantity_remaining }}</span></p>
            <p>Selling Price: {{ item.selling_price }}</p>
            <p>Cell Number: {{ item.cell_number }}</p>
            <p v-show="item.expired_at">Expires On: {{ this.$moment(item.expired_at).format("Do MMMM YYYY") }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "item-details",
    props: { 
        item: { required: true } 
    },
    computed:  {
        ifItemUnavailable() {
            return this.item['quantity_remaining'] == 0;
        }
    }  
}
</script>