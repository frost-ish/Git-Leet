const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
const port = 3000;

const { sequelize } = require("./models/index");

async function startServer() {
	await sequelize.authenticate();
	await sequelize.sync({ force: false });

	app.listen(port, () => {
		console.log("Server is running on localhost " + port);
	});
}
startServer();

app.get("/sync", async (req, res) => {
	await sequelize.sync({ force: true });
	res.send("Database synced");
});
app.use("/", require("./routes/index"));
