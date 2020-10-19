<template>
  <div>
    <button @click="add">Add</button>
    <button @click="remove">remove</button>
    <button @click="shuffle">shuffle</button>
    <transition-group name="list" tag="p">
      <span v-for="number in items" :key="number" class="list-item">{{
        number
      }}</span>
    </transition-group>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Analysis",
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNumber: 10
    };
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * 10);
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNumber++);
    },
    remove() {
      this.items.splice(this.randomIndex(), 1);
    },
    shuffle() {
      this.items = _.shuffle(this.items);
    }
  }
};
</script>

<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
  transition: all 1s ease;
}
.list-leave-active {
  transition: all 1s ease;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
