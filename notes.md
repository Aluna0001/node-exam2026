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

Daily energy updates – Push notifications with today’s horoscope

Group meditation sessions – Users can see who is online and meditating

Seperate files with different features

License: Tarot card are Downloaded legally from pixabay.
