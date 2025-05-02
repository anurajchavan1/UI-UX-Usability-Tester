// public/script.js
fetch('/api/users')
  .then(res => res.json())
  .then(users => {
    // render them into the DOM, e.g.:
    const list = document.getElementById('user-list')
    users.forEach(u => {
      const li = document.createElement('li')
      li.textContent = u.name
      list.append(li)
    })
  })
  .catch(console.error)

