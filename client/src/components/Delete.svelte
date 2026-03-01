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
    border: 2px solid var(--color-danger);
    border-radius: var(--radius-lg);
    background: var(--color-danger-soft);
  }

  .danger-zone h3 {
    color: var(--color-danger);
    margin-top: 0;
    margin-bottom: 10px;
  }

  .danger-zone p {
    color: var(--color-text-muted);
    margin-bottom: 20px;
  }

  .delete-btn {
    width: 100%;
    padding: 15px;
    background: transparent;
    border: 2px solid var(--color-danger);
    color: var(--color-danger);
    border-radius: var(--radius-md);
    font-weight: bold;
  }

  .delete-btn:hover {
    background: var(--color-danger-soft-hover);
  }

  .confirm-text {
    color: var(--color-danger);
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
    background: var(--color-danger);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-weight: bold;
  }

  .delete-confirm-btn:hover {
    background: var(--color-danger-hover);
  }

  .cancel-btn {
    flex: 1;
    padding: 15px;
    background: var(--color-border-strong);
    color: white;
    border: none;
    border-radius: var(--radius-md);
  }

  .cancel-btn:hover {
    background: #777;
  }
</style>