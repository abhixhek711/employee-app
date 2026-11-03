require ("dotenv").config();
const employeeRoutes = require("./src/routes/employeeRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");

const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use("/api/employees", employeeRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});