const pool = require("../config/db");

const getEmployees = async (
    {
    search,
    page,
     perPage,
     sortColumn,
     sortDirection
}
) => {

    const offset = (page - 1) * perPage;
    const searchValue = `%${search}%`;

    const allowedSortColumns = {
        id: "id",
        name: "name",
        email: "email",
        department: "department",
        designation: "designation",
        salary: "salary"
    };

    const column = allowedSortColumns[sortColumn] || "id";
    const direction = sortDirection === "asc" ? "ASC" : "DESC";

    const employeeQuery = `
        SELECT
            id,
            name,
            email,
            department,
            designation,
            salary
        FROM employees
        WHERE (
            name LIKE ?
            OR email LIKE ?
            OR department LIKE ?
            OR designation LIKE ?
        )
        ORDER BY ${column} ${direction}, id DESC
        LIMIT ? OFFSET ?
    `;

    const [employees] = await pool.execute(
        employeeQuery,
        [
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            perPage,
            offset
        ]
    );

    const countQuery = `
        SELECT COUNT(*) AS total
        FROM employees
        WHERE (
            name LIKE ?
            OR email LIKE ?
            OR department LIKE ?
            OR designation LIKE ?           
        )
    `;

    const [countResult] = await pool.execute(
        countQuery,
        [
            searchValue,
            searchValue,
            searchValue,
            searchValue
        ]
    );

    return {
        employees,
        total: Number(countResult[0].total)
    };
};

module.exports = {getEmployees};