<script>
  import { account } from '../stores/auth.js'
  import { logout } from '../services/authService.js'
</script>

<div>
  <h1>Welcome to this Universe, {$account.username}!</h1>
  <button onclick={logout}>Logout</button>
</div>

<style>
  div {
    padding: 20px;
  }
  
  button {
    padding: 10px 20px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>