const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const { sequelize } = require("./models/index");

async function startServer() {
	await sequelize.authenticate();

	app.listen(port, () => {
		console.log("Server is running on localhost " + port);
	});
}

startServer();

app.use("/", require("./routes/index"));
