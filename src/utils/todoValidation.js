export const TODO_TITLE_MAX_LENGTH = 100;

export function isValidTodoTitle(title) {
    const trimmed = title.trim();
    return trimmed.length > 0 && trimmed.length <= TODO_TITLE_MAX_LENGTH;
}