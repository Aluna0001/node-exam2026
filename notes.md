Generelt notes and ideas:

{#if $user.role === 'owner'}
  <OwnerDashboard />
{:else if $user.role === 'admin'}
  <AdminDashboard />
{:else}
  <UserDashboard />
{/if}

Make Dashboards bades on roles.

WebSockets:
Live tarot readings – Multiple users can watch the same cards being drawn simultaneously

Chat with a spiritual guide – Real-time messaging

Seperate files with different features

Add Zodiac sign to user profile

License: Tarot card are Downloaded legally from pixabay.
