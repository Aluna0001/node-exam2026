<script>
  import { account } from '../stores/auth.js'
  import { updateProfile, deleteAccount } from '../services/profileService.js'
  import toastr from 'toastr'

  let currentPassword = $state('')
  let newPassword = $state('')
  let confirmPassword = $state('')
  let birthdate = $state($account.birthdate || '')
  let showZodiac = $state($account.show_zodiac === 1)
  let loading = $state(false)
  let showDeleteConfirm = $state(false)

  async function handleSave() {
    if (newPassword && newPassword !== confirmPassword) {
      toastr.error('Passwords do not match')
      return
    }

    if (newPassword && newPassword.length < 6) {
      toastr.error('Password must be at least 6 characters')
      return
    }

    if (newPassword && !currentPassword) {
      toastr.error('Please enter current password to change password')
      return
    }

    loading = true

    const result = await updateProfile(currentPassword, newPassword, birthdate, showZodiac)

    if (result.error) {
      toastr.error(result.error)
    } else {
      toastr.success('Profile updated!')
      currentPassword = ''
      newPassword = ''
      confirmPassword = ''
    }

    loading = false
  }

  async function handleDeleteAccount() {
    const result = await deleteAccount()
    
    if (result.error) {
      toastr.error(result.error)
    } else {
      toastr.success('Account deleted')
      window.location.href = '/'
    }
  }
</script>

<div class="profile-settings">
  <h1>Profile Settings</h1>

  <div class="form-section">
    <h3>Account Information</h3>
    
    <label class="form-group">
      <span>Username</span>
      <input type="text" value={$account.username} disabled />
    </label>

    <label class="form-group">
      <span>Email</span>
      <input type="email" value={$account.email} disabled />
    </label>
  </div>

  <div class="form-section">
    <h3>Change Password</h3>

    <label class="form-group">
      <span>Current Password</span>
      <input type="password" bind:value={currentPassword} placeholder="Required to change password" />
    </label>

    <label class="form-group">
      <span>New Password</span>
      <input type="password" bind:value={newPassword} placeholder="Leave empty to keep current" />
    </label>

    <label class="form-group">
      <span>Confirm New Password</span>
      <input type="password" bind:value={confirmPassword} />
    </label>
  </div>

  <div class="form-section">
    <h3>Personal Information</h3>

    <label class="form-group">
      <span>Birthdate</span>
      <input type="date" bind:value={birthdate} />
    </label>

    <div class="toggle-group">
      <span>Show zodiac sign in profile</span>
      <button 
        class="toggle-switch" 
        class:active={showZodiac}
        onclick={() => showZodiac = !showZodiac}
        type="button"
        aria-label="Toggle zodiac sign visibility"
      >
        <span class="toggle-slider"></span>
      </button>
    </div>
  </div>

  <button class="save-btn" onclick={handleSave} disabled={loading}>
    {loading ? 'Saving...' : 'Save Changes'}
  </button>

  <div class="danger-zone">
  <h3>Danger Zone</h3>
  <p>Once you delete your account, there is no going back.</p>
  
  {#if !showDeleteConfirm}
    <button class="delete-btn" onclick={() => showDeleteConfirm = true}>
      Delete Account
    </button>
  {:else}
    <p class="confirm-text">Are you sure? This cannot be undone!</p>
    <div class="confirm-buttons">
      <button class="delete-confirm-btn" onclick={handleDeleteAccount}>
        Yes, Delete My Account
      </button>
      <button class="cancel-btn" onclick={() => showDeleteConfirm = false}>
        Cancel
      </button>
    </div>
  {/if}
</div>
</div>

<style>
  .profile-settings {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
  }

  h1 {
    font-size: 36px;
    color: #d4af37;
    margin-bottom: 40px;
    text-align: center;
  }

  .form-section {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 30px;
  }

  h3 {
    color: #d4af37;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 18px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .form-group:last-child {
    margin-bottom: 0;
  }

  .form-group span {
    color: #888;
    font-size: 14px;
    margin-bottom: 8px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="date"] {
    width: 100%;
    padding: 12px;
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 8px;
    color: #d4af37;
    font-size: 16px;
  }

  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .toggle-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .toggle-group > span {
    color: #888;
    font-size: 14px;
  }

  .toggle-switch {
    position: relative;
    width: 50px;
    height: 26px;
    background-color: #333;
    border: 1px solid #555;
    border-radius: 13px;
    cursor: pointer;
    transition: background-color 0.3s;
    padding: 0;
  }

  .toggle-switch.active {
    background-color: #d4af37;
    border-color: #d4af37;
  }

  .toggle-slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }

  .toggle-switch.active .toggle-slider {
    transform: translateX(24px);
  }

  .save-btn {
    width: 100%;
    padding: 15px;
    background-color: #d4af37;
    color: #0a0a0a;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  .save-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .save-btn:hover:not(:disabled) {
    background-color: #f4d03f;
  }

  .danger-zone {
  margin-top: 40px;
  padding: 30px;
  border: 2px solid #dc3545;
  border-radius: 12px;
  background: rgba(220, 53, 69, 0.05);
}

.danger-zone h3 {
  color: #dc3545;
  margin-top: 0;
  margin-bottom: 10px;
}

.danger-zone p {
  color: #888;
  margin-bottom: 20px;
}

.delete-btn {
  width: 100%;
  padding: 15px;
  background: transparent;
  border: 2px solid #dc3545;
  color: #dc3545;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.delete-btn:hover {
  background: rgba(220, 53, 69, 0.1);
}

.confirm-text {
  color: #dc3545;
  font-weight: bold;
  margin-bottom: 15px;
}

.confirm-buttons {
  display: flex;
  gap: 10px;
}

.delete-confirm-btn {
  flex: 1;
  padding: 15px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.cancel-btn {
  flex: 1;
  padding: 15px;
  background: #666;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>