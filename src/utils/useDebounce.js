import {useState, useEffect} from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
    
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;

//useEffect sets up a timeout to update the debounced value after the delay. The cleanup function in useEffect's return clears the timeout if any changes occur before delay.