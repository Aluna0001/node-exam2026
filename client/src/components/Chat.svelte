<script>
  import socket from '../services/socketService.js'
  import { account } from '../stores/auth.js'

  let messagesContainer
  let messages = $state([])
  let messageText = $state('')

  $effect(() => {
    if (messagesContainer && messages.length > 0) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  })

  socket.on('new-message', (data) => {
    messages = [...messages, data]
  })

  socket.on('user-joined', (data) => {
    messages = [...messages, {
      system: true,
      text: `${data.username} joined the chat`
    }]
  })

  socket.on('user-left', (data) => {
    messages = [...messages, {
      system: true,
      text: `${data.username} left the chat`
    }]
  })

  function sendMessage() {
    if (!messageText.trim()) return

    socket.emit('chat-message', { text: messageText })
    messageText = ''
  }
</script>

<div class="chat">
  <h3>MYSTICAL CHAT</h3>
  
  <div class="messages" bind:this={messagesContainer}>
    {#each messages as msg}
      {#if msg.system}
        <p class="system">{msg.text}</p>
      {:else}
        <div class="message">
          <span class="username">{msg.username}:</span>
          <span class="text">{msg.text}</span>
        </div>
      {/if}
    {/each}
  </div>

  <div class="input-box">
    <input 
      type="text" 
      placeholder="Type message..." 
      bind:value={messageText}
      onkeydown={(e) => e.key === 'Enter' && sendMessage()}
    />
    <button onclick={sendMessage}>Send</button>
  </div>
</div>

<style>
  .chat {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 8px;
    padding: 15px;
    margin: 15px 0;
  }

  h3 {
    font-size: 12px;
    letter-spacing: 2px;
    margin: 0 0 15px 0;
    color: #888;
  }

  .messages {
    height: 200px;
    overflow-y: auto;
    margin-bottom: 10px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }

  .message {
    margin: 8px 0;
    color: #d4af37;
  }

  .username {
    font-weight: bold;
    margin-right: 5px;
  }

  .text {
    color: #ccc;
  }

  .system {
    text-align: center;
    color: #666;
    font-style: italic;
    font-size: 12px;
    margin: 8px 0;
  }

  .input-box {
    display: flex;
    gap: 8px;
  }

  input {
    flex: 1;
    padding: 8px;
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 6px;
    color: #d4af37;
  }

  button {
    padding: 8px 16px;
    background: #d4af37;
    color: #0a0a0a;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }

  button:hover {
    background: #f4d03f;
  }
</style>