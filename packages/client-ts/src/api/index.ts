const getUsers = fetch('http://localhost:3001', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '{"query": "{people(limit: 1) { fullName}}"}',
})
const getUsersCount = fetch('http://localhost:3001', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '{"query": "{countPeople}"}',
})

const getAll = {
  async *[Symbol.asyncIterator]() {
    yield getUsers
    yield getUsersCount
  },
}
;(async () => {
  for await (const x of getAll) {
    if (x.ok) {
      try {
        const data = await x.json()
        console.log(data)
      } catch (e) {
        console.log('error parsing json: ', e)
      }
    }
  }
})()

export {}
