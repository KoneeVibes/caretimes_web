export const formatAmountDisplay = (amount: Number | String) => {
    const value = amount ?? 0;
    const parts = value.toString().split(".");
    if (parts.length === 1) return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const decimalPlaces = parts[1].length;
    return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: decimalPlaces
    });
}