type FreqUnit = 'Hz' | 'KHz' | 'MHz' | 'mHz';

class Frequency {
    private valueInMillihertz: number;

    constructor(valueInMillihertz: number) {
        this.valueInMillihertz = this.convertToMillihertz(valueInMillihertz);
    }

    convertToMillihertz(value: number): number {
        if (value < 0 || value > 9999) {
            return value;
        }
        if (value >= 1000) {
            return value * 1e6; // килогерцы в миллигерцы
        } else {
            return value * 1e9; // мегагерцы в миллигерцы
        }
    }


    // Получить частоту в милигерцах
    getMillihertz(): number {
        return this.valueInMillihertz;
    }

    // Преобразовать частоту в герцах
    toHertz(): number {
        return this.valueInMillihertz / 1e3;
    }

    // Преобразовать частоту в килогерцах
    toKilohertz(): number {
        return this.valueInMillihertz / 1e6;
    }

    // Преобразовать частоту в мегагерцах
    toMegahertz(): number {
        return this.valueInMillihertz / 1e9;
    }

    // Функция для автоматического определения и вывода значений
    displayFrequency(): void {
        if (this.valueInMillihertz >= 1e9) {
            console.log("Frequency:", this.toMegahertz(), "MHz");
        } else if (this.valueInMillihertz >= 1e6) {
            console.log("Frequency:", this.toKilohertz(), "KHz");
        } else if (this.valueInMillihertz >= 1e3) {
            console.log("Frequency:", this.toHertz(), "Hz");
        } else {
            console.log("Frequency:", this.getMillihertz(), "mHz");
        }
    }

    // Функция для парсинга строковых значений частоты в милигерцах
    static parse(freqString: string): Frequency {
        const regex = /^(\d+)(Hz|KHz|MHz|mHz)$/; // Регулярное выражение для разбора строки частоты
        const matches = freqString.match(regex);

        if (!matches) {
            throw new Error("Неверный формат строки частоты.");
        }

        const value = parseInt(matches[1]);
        const unit = matches[2] as FreqUnit;

        let millihertz: number;

        switch (unit) {
            case "Hz":
                millihertz = value * 1e3;
                break;
            case "KHz":
                millihertz = value * 1e6;
                break;
            case "MHz":
                millihertz = value * 1e9;
                break;
            case "mHz":
                millihertz = value;
                break;
            default:
                throw new Error("Неизвестная единица частоты.");
        }

        return new Frequency(millihertz);
    }
}
