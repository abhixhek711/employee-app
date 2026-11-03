const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export async function fetchEmployees({
    page,
    perPage,
    search,
    sortColumn,
    sortDirection,
    signal
}) {
    const params = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
        search,
        sort_column: sortColumn,
        sort_direction: sortDirection
    });

    const response = await fetch(`${API_URL}?${params}`, { signal });

    if (!response.ok) {
        throw new Error("Unable to fetch employees");
    }

    return response.json();
}