// public/script.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/users')
    .then(res => res.json())
    .then(users => {
      const list = document.getElementById('user-list');
      users.forEach(u => {
        const li = document.createElement('li');
        li.textContent = u.name;
        list.append(li);
      });
    })
    .catch(console.error);
});
