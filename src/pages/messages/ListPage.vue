<template>
  <base-container class="mt-header-height page chat-page">
    <the-rooms class="room-col" :loading="loadingRooms" :rooms="rooms" :activeRoom="activeRoom" @set-active-room="setRoom"></the-rooms>
    <chat-window class="window-col" :messages="messages" v-if="activeRoom">
      <h2>{{ activeRoom.receiver.name }}</h2>
      <ul class="relative" ref="chatWindowElement">
        <transition name="fade-in">
          <base-loader v-if="loadingChat"></base-loader>
        </transition>
        <chat-message v-for="message in messages" :key="message.id" :message="message"></chat-message>
      </ul>
      <form @submit.prevent="sendMessage">
        <textarea v-model.trim="message"></textarea>
        <base-button>Send</base-button>
      </form>
    </chat-window>
  </base-container>
</template>

<script setup>
  import TheRooms from '../../components/TheRooms.vue';
  import ChatWindow from '../../components/ChatWindow.vue';
  import ChatMessage from '../../components/ChatMessage.vue';

  import axios from '../../axios';
  import { useStore } from 'vuex';
  import { ref, onMounted } from 'vue';

  const store = useStore();
  
  const messages = ref([]);
  const message = ref('');
  const rooms = ref([]);
  const activeRoom = ref(null);
  const loadingRooms = ref(false);
  const loadingChat = ref(false);

  const chatWindowElement = ref(null); // Template ref

  function scrollToBottom() {
    chatWindowElement.value.scroll({top: chatWindowElement.value.scrollHeight});
  }

  function loadChat() {
    loadingChat.value = true;
    axios.get(`/messages/rooms/${activeRoom.value.id}`).then((res) => {
      const { messages: responseMessages, success, errMsg } = res.data;
      if (success === true) {
        messages.value = responseMessages;
      } else if (success === false) {
        store.dispatch('addErrorMessage', errMsg);
      }
    }).catch(() => {
      store.dispatch('addErrorMessage', 'Couldnt load messages!');
    }).finally(() => {
      loadingChat.value = false;
      scrollToBottom();
    })
  }

  function setRoom(room) {
    activeRoom.value = room;
    loadChat();
  }

  function sendMessage() {
    if (!message.value) {
      store.dispatch('addErrorMessage','Enter message!');
      return
    }

    axios.post(`/messages/rooms/${activeRoom.value.id}`, {message: message.value}).then(res => {
      const { success, message: responseMessage, inserted } = res.data;
      if (success === true) {
        messages.value.push(inserted);
        message.value = '';
      } else if (success === false) {
        store.dispatch('addErrorMessage', responseMessage);
      }
    }).catch(() => {
      store.dispatch('addErrorMessage', 'Couldnt send message!');
    }).finally(() => {
      scrollToBottom();
    })
  }

  function loadRooms() {
    loadingRooms.value = true;
    axios.get('/messages/rooms').then(res => {
      const { rooms: responseRooms } = res.data;
      if (responseRooms) {
        rooms.value = responseRooms;
      } else {
        store.dispatch('addErrorMessage', 'Couldnt load rooms!');
      }
    }).catch(() => {
      store.dispatch('addErrorMessage', 'Couldnt load rooms!');
    }).finally(() => {
      loadingRooms.value = false;
    })
  }

  onMounted(loadRooms);
</script>

<style scoped>

  .chat-page {
    display: flex;
    gap: 0 var(--space-8);
  }

  .room-col {
    width: 100%;
    max-width: 15rem;
  }

  .window-col {
    width: 100%;
    padding-top: var(--space-4);
  }

  .window-col ul {
    height: 50vh;
    overflow: auto;
    padding-right: var(--space-2);
  }

  .window-col form {
    display: flex;
    align-items: flex-end;
    margin-top: var(--space-4);
  }

  .window-col form textarea {
    min-height: 2.5rem;
    height: auto;
    font-size: 0.8rem;
  }

  .window-col form button {
    font-size: 0.8rem;
    padding: var(--space-2);
    height: 2rem;
    min-width: 5rem;
    margin-left: var(--space-4)
  }

  h2 {
    font-size: 2rem;
    margin-bottom: var(--space-4)
  }
  h2:after {
    content: '';
    display: block;
    width: 3.5rem;
    height: 3px;
    background-color: var(--color-cloud-blue);
    border-radius: 3px;
    margin-top: var(--space-2);
  }


  /**CUSTOM SCROLLBARS */

  /**textarea */
  textarea::-webkit-scrollbar {
    display: none;
  }

  /**for chat window ul */
  .window-col ul::-webkit-scrollbar {
    width: 10px;
  }
  .window-col ul::-webkit-scrollbar-track {
    background-color: var(--color-bright-grey-opacity);
  }

  /* Handle */
  .window-col ul::-webkit-scrollbar-thumb {
    background-color: var(--color-cloud-blue);
  }
</style>