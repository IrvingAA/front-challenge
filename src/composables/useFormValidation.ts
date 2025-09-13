export function useFormValidation() {
  const required = (value: unknown) => {
    if (value === null || value === undefined) return 'Required.';
    if (typeof value === 'string' && value.trim() === '') return 'Required.';
    return true;
  };

  const isNumber = (value: unknown) => {
    if (value === null || value === undefined || value === '') return 'Required.';
    return isNaN(Number(value)) ? 'Must be a number.' : true;
  };

  const startBeforeEnd = (start?: string, end?: string) => {
    if (!start || !end) return true;
    const s = new Date(start);
    const e = new Date(end);
    return s < e || 'Start must be before End.';
  };

  return { required, isNumber, startBeforeEnd };
}
