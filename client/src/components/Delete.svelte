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

<div class="delete-section">
  <h3>Delete Account</h3>
  <p>Once you delete your account, there is no going back.</p>

  {#if !showDeleteConfirm}
    <button class="delete-btn" onclick={() => showDeleteConfirm = true}>
      Delete Account
    </button>
  {:else}
    <p class="confirm-text">Are you sure? This cannot be undone.</p>
    <div class="confirm-buttons">
      <button class="confirm-btn" onclick={handleDeleteAccount}>
        Yes, Delete My Account
      </button>
      <button class="cancel-btn" onclick={() => showDeleteConfirm = false}>
        Cancel
      </button>
    </div>
  {/if}
</div>

<style>
  .delete-section {
    margin-top: 40px;
    padding: 30px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-primary-faint);
  }

  .delete-section h3 {
    color: var(--color-text);
    margin-top: 0;
    margin-bottom: 10px;
  }

  .delete-section p {
    color: var(--color-text-muted);
    margin-bottom: 20px;
  }

  .delete-btn {
    width: 100%;
    padding: 15px;
    background: transparent;
    border: 1px solid var(--color-text);
    color: var(--color-text);
    border-radius: var(--radius-md);
    font-weight: bold;
  }

  .delete-btn:hover {
    background: var(--color-primary-soft);
  }

  .confirm-text {
    color: var(--color-text-muted);
    margin-bottom: 15px;
  }

  .confirm-buttons {
    display: flex;
    gap: 10px;
  }

  .confirm-btn {
    flex: 1;
    padding: 15px;
    background: var(--color-primary);
    color: var(--color-bg);
    border: none;
    border-radius: var(--radius-md);
    font-weight: bold;
  }

  .confirm-btn:hover {
    background: var(--color-primary-hover);
  }

  .cancel-btn {
    flex: 1;
    padding: 15px;
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    border-radius: var(--radius-md);
  }

  .cancel-btn:hover {
    background: var(--color-primary-soft);
  }
</style>