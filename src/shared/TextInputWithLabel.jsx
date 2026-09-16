import styles from './TextInputWithLabel.module.css';

function TextInputWithLabel({
    elementId,
    ref,
    onChange,
    labelText,
    value,
    maxLength
}) {


    return (
        <>
            <label htmlFor={elementId} className={styles.label}>{labelText}</label>
            <input 
                type="text"
                id={elementId}
                ref={ref}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className={styles.input}
            />
        </>
    )
}

export default TextInputWithLabel;