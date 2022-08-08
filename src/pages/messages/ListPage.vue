<template>
  <base-container class="mt-header-height page chat-page">
    <the-rooms class="room-col" :loading="loadingRooms" :rooms="rooms" :activeRoom="activeRoom" @set-active-room="setRoom"></the-rooms>
    <chat-window class="window-col" :messages="messages" v-if="activeRoom">
      <h2>{{ activeRoom.receiver.name }}</h2>
      <ul class="relative" ref="chatWindow">
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

<script>
  import TheRooms from '../../components/TheRooms.vue';
  import ChatWindow from '../../components/ChatWindow.vue';
  import ChatMessage from '../../components/ChatMessage.vue';
  import axios from '../../axios';
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        messages: [],
        message: '',
        rooms: [],
        activeRoom: null,
        loadingRooms: false,
        loadingChat: false,
      }
    },
    components: {
      'the-rooms': TheRooms,
      'chat-window': ChatWindow,
      'chat-message': ChatMessage
    },
    methods: {
      ...mapActions(['addErrorMessage']),
      setRoom(room) {
        this.activeRoom = room;
        this.loadChat();
      },
      loadChat() {
        this.loadingChat = true;
        axios.get(`/messages/rooms/${this.activeRoom.id}`).then((res) => {
          const { messages, success, errMsg } = res.data;
          if (success === true) {
            this.messages = messages;
          } else if (success === false) {
            this.addErrorMessage(errMsg)
          }
        }).catch(() => {
          this.addErrorMessage('Couldnt load messages!')
        }).finally(() => {
          this.loadingChat = false;
          this.scrollToBottom();
        })
      },
      loadRooms() {
        this.loadingRooms = true;
        axios.get('/messages/rooms').then(res => {
          const { rooms } = res.data;
          if (rooms) {
            this.rooms = rooms;
          } else {
            this.addErrorMessage('Couldnt load rooms!');
          }
        }).catch(() => {
          this.addErrorMessage('Couldnt load rooms!');
        }).finally(() => {
          this.loadingRooms = false;
        })
      },
      sendMessage() {
        if (!this.message) {
          this.addErrorMessage('Enter message!');
          return
        }

        axios.post(`/messages/rooms/${this.activeRoom.id}`, {message: this.message}).then(res => {
          const { success, message, inserted } = res.data;
          if (success === true) {
            this.messages.push(inserted);
            this.message = '';
          } else if (success === false) {
            this.addErrorMessage(message);
          }
        }).catch(() => {
          this.addErrorMessage('Couldnt send message!');
        }).finally(() => {
          this.scrollToBottom();
        })
      },
      scrollToBottom() {
        this.$refs.chatWindow.scroll({top: this.$refs.chatWindow.scrollHeight});
      }
    },
    mounted() {
      this.loadRooms()
    }
  }
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