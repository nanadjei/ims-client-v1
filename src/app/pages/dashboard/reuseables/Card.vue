<template>
  <div :class="`card border-left-${type || 'primary'} shadow h-100 py-2`">
    <div class="card-body">
      <div class="row no-gutters align-items-center">
        <div class="col mr-2">
          <div
            class="text-xs font-weight-bold text-primary text-uppercase mb-1"
          >
            {{ String(heading) }}
          </div>
          <div class="h5 mb-0 font-weight-bold text-gray-800">
            GHS {{ parseFloat(data).toFixed(2) }}
          </div>
        </div>
        <div class="col-auto">
          <i class="fas fa-calendar fa-2x text-gray-300"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: { data: undefined, icon: String, heading: String, type: String },
};
</script>
