<template>
  <base-container class="mt-header-height page chat-page">
    <the-rooms class="room-col"></the-rooms>
    <chat-window class="window-col" :messages="messages">
      <h2>Edijs Apse</h2>
      <ul>
        <chat-message v-for="message in messages" :key="message.id" :message="message"></chat-message>
      </ul>
      <form @submit.prevent="sendMessage">
        <textarea v-model="message"></textarea>
        <base-button>Send</base-button>
      </form>
    </chat-window>
  </base-container>
</template>

<script>
  import TheRooms from '../../components/TheRooms.vue';
  import ChatWindow from '../../components/ChatWindow.vue';
  import ChatMessage from '../../components/ChatMessage.vue';

  export default {
    data() {
      return {
        messages: [
          {
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            isMyMessage: true,
          },
          {
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            isMyMessage: true,
          },
          {
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            isMyMessage: false,
          },
          {
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            isMyMessage: true,
          },
          {
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            isMyMessage: false,
          },
          {
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            isMyMessage: false,
          },
          {
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            isMyMessage: true,
          },
        ],
        message: ''
      }
    },
    components: {
      'the-rooms': TheRooms,
      'chat-window': ChatWindow,
      'chat-message': ChatMessage
    },
    methods: {
      sendMessage() {}
    },
    created() {
      console.log('created')
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