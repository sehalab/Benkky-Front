
export const flash = {
  set(type, message) {
    const messages = JSON.parse(localStorage.getItem('flash_messages') || '{}')
    messages[type] = message
    localStorage.setItem('flash_messages', JSON.stringify(messages))

    setTimeout(() => {
      this.clear(type)
    }, 5000)
  },

  get() {
    const messages = JSON.parse(localStorage.getItem('flash_messages') || '{}')
    localStorage.removeItem('flash_messages')
    return messages
  },

  clear(type = null) {
    if (type) {
      const messages = JSON.parse(localStorage.getItem('flash_messages') || '{}')
      delete messages[type]
      localStorage.setItem('flash_messages', JSON.stringify(messages))
    } else {
      localStorage.removeItem('flash_messages')
    }
  },
}
