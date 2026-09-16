import { useSearchParams } from 'react-router';
import styles from './StatusFilter.module.css';

function StatusFilter() {
    const [searchParams, setSearchParams] = useSearchParams();  //this gives us an object, searchParams, representing the current URL's query string
    const currentStatus = searchParams.get('status') || 'all';

    const handleStatusChange = (status) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (status === 'all') {
            newSearchParams.delete('status');
        }
        else {
            newSearchParams.set('status', status);
        }
        setSearchParams(newSearchParams);
    };

    return (
        <div className={styles.group}>
            <label htmlFor='statusFilter' className={styles.label}>Show:</label>
            <select
                id='statusFilter'
                value={currentStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={styles.select}
            >
            
                <option value='all'>All Todos</option>
                <option value='active'>Active Todos</option>
                <option value='completed'>Completed Todos</option>
            </select>
        </div>
    );
}

export default StatusFilter;