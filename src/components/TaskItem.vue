<template>
  <div class="flex items-center gap-2 mb-2">
    <input type="checkbox" :checked="task.done" @change="$emit('toggle')" />

    <span
      v-if="!editing"
      :class="{ 'line-through text-gray-400': task.done }"
      @dblclick="startEditing"
      class="flex-1 cursor-pointer"
    >
      {{ task.label }}
    </span>

    <input
      v-else
      v-model="editLabel"
      @keyup.enter="submitEdit"
      @blur="submitEdit"
      class="border p-1 rounded flex-1"
      autofocus
    />

    <button
      @click="$emit('notify')"
      class="text-blue-500 hover:text-blue-700"
      title="Rappel notification"
    >
      🔔
    </button>

    <button
      @click="$emit('delete')"
      class="text-red-500 hover:text-red-700"
      title="Supprimer tâche"
    >
      ✖
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
defineProps(["task"]);
const emit = defineEmits(["toggle", "delete", "edit", "notify"]);

const editing = ref(false);
const editLabel = ref("");

function startEditing() {
  editing.value = true;
  editLabel.value = __props.task.label;
}

function submitEdit() {
  editing.value = false;
  if (editLabel.value.trim() !== "") {
    emit("edit", __props.task.id, editLabel.value.trim());
  }
}
</script>
