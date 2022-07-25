<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <!-- Yield Content -->
      <!-- Components here -->
      <slot></slot>
      <!-- End Yield Content -->
    </div>
  </div>
</template>

<style lang="css" scoped>
.bg-gradient-primary {
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  name: "GuestLayout"
};
</script>
