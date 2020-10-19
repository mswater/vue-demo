<template>
  <div>
    <div class="outer">
      <div class="inner">
        <span for="item in queue" :key="`Symbol(item)`">{{ item }}</span>
      </div>
    </div>
    <div class="btns">
      <a-button @click="addItem">添加</a-button>
      <a-button @click="delItem">删除</a-button>
    </div>
  </div>
</template>

<script>
class CircularQueue {
  constructor(size) {
    this.head = 0;
    this.tail = 0;
    this.size = size;
    this.arrForQueue = new Array(size);
  }
  enqueue(item) {
    if (this.head == (this.tail + 1) % this.size) {
      return "full";
    }
    this.arrForQueue[this.tail] = item;
    if (this.tail == this.size - 1) {
      this.tail = 0;
    } else {
      this.tail++;
    }
    return this.tail;
  }
  dequeue() {
    if (this.head == this.tail) return "empty";
    this.arrForQueue[this.head] = null;
    if (this.head == this.size - 1) {
      this.head = 0;
    } else {
      this.head++;
    }
    return this.head;
  }
}
export default {
  name: "CircularQueue",
  data() {
    return {
      queue: new CircularQueue()
    };
  },
  methods: {
    addItem() {
      let item = Math.ceil(Math.random() * 100);
      let result = this.queue.enqueue(item);
      if (result == "full") {
        console.log("队列已满");
      }
    },
    delItem() {
      let result = this.queue.dequeue();
      if (result == "empty") {
        console.log("队列已清空");
      }
    }
  }
};
</script>

<style scoped></style>
