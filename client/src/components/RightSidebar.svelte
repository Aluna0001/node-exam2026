<script>
  import { account } from '../stores/auth.js'
</script>

<aside class="right-sidebar">
  <h3>YOUR PROFILE</h3>
  <div class="profile-card">
    <p class="username">{$account.username}</p>
    <p class="role">{$account.role}</p>
    <p class="info">Birthdate: Not set</p>
    <p class="info">Zodiac: Unknown</p>
  </div>

  <h3>LATEST READINGS</h3>
  <div class="reading">
    <p class="type">TAROT</p>
    <p class="title">The Stars</p>
    <p class="time">1 day ago</p>
  </div>
  
  <h3>TODAY'S ENERGY</h3>
  <div class="energy">
    <div class="icon">⭐</div>
    <p>"The universe sends you messages. Listen with your heart."</p>
  </div>
</aside>

<style>
  .right-sidebar h3 {
    font-size: 12px;
    letter-spacing: 2px;
    margin: 30px 0 15px 0;
    color: #888;
  }

  .profile-card {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 8px;
    padding: 15px;
    margin: 15px 0;
  }

  .username {
    font-size: 18px;
    font-weight: bold;
    color: #d4af37;
    margin-bottom: 5px;
  }

  .role {
    font-size: 12px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .info {
    font-size: 14px;
    color: #666;
    margin: 5px 0;
  }

  .reading {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 8px;
    padding: 15px;
    margin: 15px 0;
  }

  .reading .type {
    font-size: 10px;
    letter-spacing: 1px;
    color: #888;
  }

  .reading .title {
    font-size: 16px;
    margin: 8px 0;
  }

  .reading .time {
    font-size: 12px;
    color: #666;
  }

  .energy {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 8px;
    padding: 20px;
    margin: 15px 0;
    text-align: center;
  }

  .energy .icon {
    font-size: 64px;
    margin-bottom: 15px;
  }

  .energy p {
    font-style: italic;
    color: #888;
    font-size: 14px;
    line-height: 1.6;
  }
</style>