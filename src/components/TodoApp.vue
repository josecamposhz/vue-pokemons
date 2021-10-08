<template>
  <div class="container mt-3">
    <h1>TodoApp</h1>

    <div class="form-group">
      <input
        v-model="newTodo.description"
        type="text"
        class="form-control"
        placeholder="Crear tarea"
        @keyup.enter="addTodo"
      />
      <span v-if="error" class="text-danger">Campo requerido</span>
    </div>

    <ul class="mt-4 ps-0">
      <li
        v-for="(todo, index) in todos"
        :key="index"
        class="
          alert alert-secondary
          d-flex
          justify-content-between
          align-items-center
          gap-2
        "
      >
        <input v-if="editIndex === index" v-model="editTodo" type="text" />
        <div
          v-else
          @click="changeStatus(index)"
          role="button"
          class="flex-grow-1"
          :class="{
            'text-secondary text-decoration-line-through': todo.status,
          }"
        >
          {{ todo.description }}
        </div>
        <div v-if="editIndex === index" class="d-flex gap-2">
          <button class="btn btn-secondary" @click="cancel">Cancelar</button>
          <button class="btn btn-success" @click="saveTodo(index)">
            Guardar
          </button>
        </div>
        <div v-else class="d-flex gap-2">
          <button class="btn btn-primary" @click="setTodo(index)">
            Editar
          </button>
          <button class="btn btn-danger" @click="deleteTodo(index)">
            Eliminar
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
class Todo {
  constructor(todo = {}) {
    this.description = todo.description || "";
    this.status = todo.status || false;
  }
}

export default {
  data() {
    return {
      newTodo: new Todo(),
      editTodo: "",
      todos: [new Todo({ description: "Aprender Vue" })],
      error: false,
      editIndex: -1,
    };
  },
  methods: {
    addTodo() {
      this.error = false;
      if (this.newTodo.description.length > 0) {
        this.todos.push(this.newTodo);
        this.newTodo = new Todo();
      } else {
        this.error = true;
      }
    },
    setTodo(index) {
      this.editIndex = index;
      this.editTodo = this.todos[index].description;
    },
    saveTodo(index) {
      this.todos[index].description = this.editTodo;
      this.editIndex = -1;
    },
    deleteTodo(index) {
      const confirm = window.confirm("¿Estás seguro de eliminar la tarea?");
      if (confirm) this.todos.splice(index, 1);
    },
    cancel() {
      this.editIndex = -1;
    },
    changeStatus(index) {
      this.todos[index].status = !this.todos[index].status;
    },
  },
};
</script>
