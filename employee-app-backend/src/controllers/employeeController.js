const employeeService = require("../services/employeeService");

const getEmployees = async (req, res, next) => {

    try {
        const search = String(req.query.search || "");
        const page = Number(req.query.page || 1);

        const perPage = Number(req.query.per_page || 10);

        const sortColumn = String(req.query.sort_column || "id");
        

        const sortDirection = String(req.query.sort_direction || "desc").toLowerCase();

        if (
            search.length > 100 ||
            !Number.isSafeInteger(page) ||
            !Number.isSafeInteger(perPage) ||
            page < 1 ||  perPage < 1 ||    perPage > 100 ||
            !["asc", "desc"].includes(sortDirection)
        ) 
        {
            return res.status(400).json(

              {
                success: false,
                message: "Invalid query parameters"
            });
        }

        const result = await employeeService.getEmployees({
            search,
            page,
            perPage,
            sortColumn,
            sortDirection
        });



        const totalPages = Math.ceil(result.total / perPage);

        res.status(200).json({
            success: true,
            data: result.employees,
            pagination: {
                page,
                perPage,

                totalRows: result.total,
                totalPages
            }
        });

    } catch (error)
{
        next(error);
    }
};

module.exports = { getEmployees };