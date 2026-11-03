import { useEffect, useState } from "react";
import EmployeeTable from "./components/EmployeeTable";
import { fetchEmployees } from "./services/employeeService";
import "./App.css";

function App() {
    const [employees, setEmployees] = useState([]);

    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0);
    const [sortColumn, setSortColumn] = useState("id");
    const [sortDirection, setSortDirection] = useState("desc");
    const [refreshKey, setRefreshKey] = useState(0);
    
    const [paginationReset, setPaginationReset] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== searchInput) {
                setSearch(searchInput);
                setPage(1);

                setPaginationReset(reset => !reset);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [searchInput, search]);

    useEffect(() => {
        const controller = new AbortController();

        async function loadEmployees() {
            try {
                setLoading(true);
                setError("");

                   const result = await fetchEmployees({
                         page,
                         perPage,
                         search,
                         sortColumn,
                         sortDirection,
                         signal: controller.signal
                });

                if (!result.success) {
                    throw new Error("Unable to load employees");
                }

                setEmployees(result.data);
                 setTotalRows(result.pagination.totalRows);
                 
            } catch (err) {
                if (err.name === "AbortError") return;

                 setError(err.message);
                 setEmployees([]);
                setTotalRows(0);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadEmployees();

        return () => controller.abort();
    }, [page, perPage, search, sortColumn, sortDirection, refreshKey]);

    function handlePerRowsChange(newPerPage) {
        setPerPage(newPerPage);
        setPage(1);
        setPaginationReset(reset => !reset);
    }

    function handleSort(column, direction) {
        if (!column.sortField) return;

        setSortColumn(column.sortField);
        setSortDirection(direction);
        setPage(1);
        setPaginationReset(reset => !reset);
    }

    return (
        <main className="app-container">
            <header className="header">
                <div>
                    <h2>Employee Directory</h2>
                    <p>Manage and explore employee records</p>
                </div>

                <p className="employee-count">
                    Total Employees: {totalRows}
                </p>
            </header>

            <div className="search-section">
                <label className="visually-hidden" htmlFor="employee-search">
                    Search employees
                </label>
                <input
                    id="employee-search"
                    type="search"
                    placeholder="Search by name, email, department..."
                    value={searchInput}
                    onChange={event => setSearchInput(event.target.value)}
                />
            </div>

            {error && (
                <div className="error-message" role="alert">
                    <span>{error}</span>
                    <button onClick={() => setRefreshKey(key => key + 1)}>
                        Retry
                    </button>
                </div>
            )}

            <EmployeeTable
                employees={employees}
                loading={loading}
                totalRows={totalRows}
                page={page}
                perPage={perPage}
                paginationReset={paginationReset}
                onChangePage={setPage}
                onChangeRowsPerPage={handlePerRowsChange}
                onSort={handleSort}
            />
        </main>
    );
}

export default App;
