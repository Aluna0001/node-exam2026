<script>
  import { account } from '../stores/auth.js'
  import { get } from 'svelte/store'
  import { updateProfile } from '../services/profileService.js'
  import toastr from 'toastr'
  import Delete from '../components/Delete.svelte'

  const user = get(account)

  let currentPassword = $state('')
  let newPassword = $state('')
  let confirmPassword = $state('')
  let birthdate = $state(user?.birthdate || '')
  let showZodiac = $state(user?.show_zodiac === 1)
  let loading = $state(false)

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
</script>

<div class="profile-settings">
  <h1>Profile Settings</h1>

  <div class="form-section">
    <h3>Account Information</h3>

    <label class="form-group">
      <span>Username</span>
      <input type="text" value={user?.username} disabled />
    </label>

    <label class="form-group">
      <span>Email</span>
      <input type="email" value={user?.email} disabled />
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

  <Delete />
</div>

<style>
  .profile-settings {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
  }

  h1 {
    font-size: 36px;
    color: var(--color-text);
    margin-bottom: 40px;
    text-align: center;
  }

  .form-section {
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 30px;
    margin-bottom: 30px;
  }

  h3 {
    color: var(--color-text);
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
    color: var(--color-text-muted);
    font-size: 14px;
    margin-bottom: 8px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="date"] {
    width: 100%;
    padding: 12px;
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    font-size: 16px;
    font-family: var(--font-family);
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
    color: var(--color-text-muted);
    font-size: 14px;
  }

  .toggle-switch {
    position: relative;
    width: 50px;
    height: 26px;
    background-color: var(--color-border);
    border: 1px solid var(--color-border-strong);
    border-radius: 13px;
    transition: background-color 0.3s;
    padding: 0;
  }

  .toggle-switch.active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
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
    background-color: var(--color-primary);
    color: var(--color-bg);
    border: none;
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: bold;
  }

  .save-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .save-btn:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }
</style>