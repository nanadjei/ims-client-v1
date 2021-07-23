<template>
  <div :ref="`list-${item.id}`">
    <span>{{ item.name }}</span>
  </div>
</template>

<script>
export default {
    name: "AutoComplete",
    props: {
        item: { required: true },
    }
}
</script>