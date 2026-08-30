function SortBy({sortBy, sortDirection, onSortByChange, onSortDirectionChange}) {
    return(
        <>
            <label htmlFor="sortBy">Sort By</label>
            <select id="sortBy" value={sortBy} onChange={(event) => onSortByChange(event.target.value)}>
                <option value='createdAt'>Created At</option>
                <option value='title'>Title</option>
            </select>

            <label htmlFor="sortDirection">Order</label>
            <select id="sortDirection" value={sortDirection} onChange={(event) => onSortDirectionChange(event.target.value)}>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
            </select>
        </>
    )
}

export default SortBy;