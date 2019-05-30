module.exports = () => {
    const data = { users: [] }
    // Create 1000 users
    for (let i = 1; i < 1000; i++) {
      data.users.push({ id: i, firstname: '', lastname: '' })
    }
    return data
  }