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

//=======================
let isLoopRunning

const loop = async () => {
  if (!isLoopRunning) return
  await deleteAll()
  loop()
}

const startLoop = () => {
  if (isLoopRunning) return
  console.log("Started...")
  isLoopRunning = true
  loop()
}

const stopLoop = () => {
  if (!isLoopRunning) return
  console.log("Stopped...")
  isLoopRunning = false
}

//=======================

const server = http.createServer((req, res) => {
  if (req.url === "/stop") {
    stopLoop()
    return res.end("<h1>Deletion stopped!</h1>")
  }

  if (req.url === "/start") {
    startLoop()
    return res.end("<h1>Deletion started!</h1>")
  }

  res.end("<h1>Hello World!</h1>")
})

server.listen(process.env.PORT || 80)
