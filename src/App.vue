<template>
  <main class="p-4 max-w-md mx-auto">
    <h1 class="text-xl font-bold mb-4">Mes tâches</h1>
    <form @submit.prevent="addTask" class="flex flex-col gap-2 mb-4">
      <input v-model="newTask" class="border p-2 rounded" placeholder="Nouvelle tâche" />
      <select v-model="repetition" class="border p-2 rounded">
        <option value="never">Jamais</option>
        <option value="daily">Chaque jour</option>
        <option value="weekly">Chaque semaine</option>
        <option value="monthly">Chaque mois</option>
      </select>
      <button class="bg-blue-600 text-white p-2 rounded">Ajouter</button>
    </form>

    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="toggleDone(task.id)"
      @delete="deleteTask(task.id)"
      @edit="editTask"
      @notify="notifyTask(task)"
    />
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import TaskItem from "./components/TaskItem.vue";

const newTask = ref("");
const repetition = ref("never");
const tasks = ref([]);

const loadTasks = () => {
  const saved = localStorage.getItem("tasks");
  if (saved) tasks.value = JSON.parse(saved);
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const addTask = () => {
  if (!newTask.value.trim()) return;
  tasks.value.push({
    id: Date.now(),
    label: newTask.value,
    done: false,
    repetition: repetition.value,
    lastDone: null,
  });
  newTask.value = "";
  repetition.value = "never";
};

const toggleDone = (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (!task) return;
  task.done = !task.done;
  task.lastDone = new Date().toISOString();
};

const refreshRecurringTasks = () => {
  const now = new Date();
  tasks.value.forEach((task) => {
    if (!task.repetition || task.repetition === "never" || !task.lastDone) return;

    const last = new Date(task.lastDone);
    const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

    if (
      (task.repetition === "daily" && diffDays >= 1) ||
      (task.repetition === "weekly" && diffDays >= 7) ||
      (task.repetition === "monthly" && now.getMonth() !== last.getMonth())
    ) {
      task.done = false;
    }
  });
};

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

const editTask = (id, newLabel) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.label = newLabel
  }
}

onMounted(() => {
  loadTasks();
  refreshRecurringTasks();
  askNotificationPermission()
});

watch(tasks, saveTasks, { deep: true });

// Notifications basiques
function askNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      console.log('Permission notification:', permission)
    })
  }
}

function showNotification(title, options = {}) {
  if (Notification.permission === 'granted') {
    new Notification(title, options)
  }
}

function notifyTask(task) {
  showNotification('Rappel tâche', {
    body: task.label,
  })
}
</script>
