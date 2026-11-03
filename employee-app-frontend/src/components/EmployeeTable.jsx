import DataTable from "react-data-table-component";

const columns = [
    {
        name: "ID",
        selector: row => row.id,
        sortField: "id",
        sortable: true,
        width: "80px"
    },

    {
        name: "Employee Name",
        selector: row => row.name,
        sortField: "name",
        sortable: true,
        grow: 1.5
    },
    {
        name: "Email",
        selector: row => row.email,
        sortField: "email",
        sortable: true,
        grow: 1.5
    },
    {
        name: "Department",
        selector: row => row.department,
        sortField: "department",
        sortable: true
    },

    {
        name: "Designation",
        selector: row => row.designation,
        sortField: "designation",
        sortable: true,
        grow: 1.5
    },
    {
        name: "Salary",
        selector: row => Number(row.salary),
        sortField: "salary",
        sortable: true,
        cell: row => (

            <strong>₹{Number(row.salary).toLocaleString("en-IN")}</strong>

        )
    }
];

const EmployeeTable = ({
    employees,
    loading,
    totalRows,
    page,
    perPage,
    paginationReset,
    onChangePage,
    onChangeRowsPerPage,
    onSort
}) => {
    return (
        <DataTable
            columns={columns}
            data={employees}
            keyField="id"
            sortServer
            onSort={onSort}

            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationDefaultPage={page}
            paginationPerPage={perPage}
            paginationResetDefaultPage={paginationReset}
            paginationRowsPerPageOptions={[5, 10, 20, 50]}
            
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            progressPending={loading}
            progressComponent={<h3>Loading employees...</h3>}
            noDataComponent={<p>No employees found.</p>}
            striped
            highlightOnHover
            responsive
        />
    );
};

export default EmployeeTable;