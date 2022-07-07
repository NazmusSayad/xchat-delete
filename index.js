const fetch = require("node-fetch")
const FormData = require("form-data")
const http = require("http")

const getData = async () => {
  const res = await fetch("https://sheetdb.io/api/v1/b70w6hs5ccavr")
  return res.json()
}

const postData = async (name, msg) => {
  const form = new FormData()
  form.append("data[name]", name)
  form.append("data[msg]", msg)

  return fetch("https://sheetdb.io/api/v1/b70w6hs5ccavr", {
    method: "POST",
    body: form,
  })
}

const deleteAll = async () => {
  const res = await fetch("https://sheetdb.io/api/v1/b70w6hs5ccavr/all", {
    method: "DELETE",
  })

  console.log("Data deleted...")
  return res
}

const loop = async () => {
  await deleteAll()
  loop()
}

loop()

// setInterval(() => {
//   deleteAll()
// }, 1000)

const server = http.createServer((req, res) => {
  res.end("Hello World!")
})

server.listen(process.env.PORT || 80, () => {
  console.log("Listening on port 80")
})
