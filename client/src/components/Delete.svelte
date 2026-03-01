<script>
  import { deleteAccount } from '../services/profileService.js'
  import toastr from 'toastr'

  let showDeleteConfirm = $state(false)

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

<style>
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

  .delete-confirm-btn:hover {
    background: #c82333;
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

  .cancel-btn:hover {
    background: #777;
  }
</style>