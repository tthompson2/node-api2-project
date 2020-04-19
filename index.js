const express = require("express");
const cors = require("cors");
const welcomeRouter = require("./data/welcome/welcome-router");
const blogRouter = require("./blog/blog-router")

const server = express();
const port = 4000;

server.use("/", welcomeRouter);
server.use("/blog", blogRouter);

server.use(express.json());
server.use(cors());

// server.use(logger("short"))

server.use((req, res) => {

    res.status(404).json({
        message: "Route was not found",
    })

})

server.use((err, req, res, next) => {
    console.log(err)

    res.status(400).json({
        message: "Something went wrong"
    })
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})