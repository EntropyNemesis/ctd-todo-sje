import styles from './AboutPage.module.css';

function AboutPage() {
    return (
        <div className={styles.page}>
            <h2 className={styles.title}>About the Todo List App</h2>
            <p className={styles.intro}>
                <strong>
                    With this user-friendly tool at your fingertips, never lose track of a task again! Enjoy the satisfaction of tracking all that you accomplish, and increase your productivity.
                </strong>
            </p>
            <h3 className={styles.sectionTitle}>App Features</h3>
                <p className={styles.body}>This new app offers an assortment of handy features for managing tasks and organizing one's to-do list. 
                    Todo list items can be added as needed, and each one appears in a list with an interactive checkbox that can be clicked to indicate
                    completion of the task, and removal from the list of active pending todo list items. The list can be sorted,
                    filtered, and each item can be edited or removed if no longer applicable. Save your custom todo list and the status of 
                    each item in your profile, by creating a free account!
                </p>
            <h3 className={styles.sectionTitle}>Technologies Used</h3>
                <p className={styles.body}>This helpful Todo List app utilizes modern technologies such as React, React Router, and Vite.</p>
        </div>
    )
}

export default AboutPage;