type Percentage = number & { __percentageBrand: true };

function createPercentage(value: number): Percentage {
    if (value < 0 || value > 100) {
        throw new Error("Значение процента должно быть между 0 и 100.");
    }
    return value as Percentage;
}
