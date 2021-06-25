<template>
  <div>
    <b>#{{ item.id }}</b>
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