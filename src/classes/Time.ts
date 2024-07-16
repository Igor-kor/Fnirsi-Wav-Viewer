type TimeUnit = "s" | "ms" | "μs" | "ns";

class Time {
    private nanoseconds: number;

    constructor(nanoseconds: number) {
        this.nanoseconds = nanoseconds;
    }

    // Получить время в наносекундах
    getNanoseconds(): number {
        return this.nanoseconds;
    }

    // Преобразовать время в секунды
    toSeconds(): number {
        return this.nanoseconds / 1e9;
    }

    // Преобразовать время в миллисекунды
    toMilliseconds(): number {
        return this.nanoseconds / 1e6;
    }

    // Преобразовать время в микросекунды
    toMicroseconds(): number {
        return this.nanoseconds / 1e3;
    }

    // Преобразовать время в наносекунды
    toNanoseconds(): number {
        return this.nanoseconds;
    }

    // Функция для автоматического определения и вывода значений
    displayTime(): void {
        if (this.nanoseconds >= 1e9) {
            console.log("Time:", this.toSeconds(), "s");
        } else if (this.nanoseconds >= 1e6) {
            console.log("Time:", this.toMilliseconds(), "ms");
        } else if (this.nanoseconds >= 1e3) {
            console.log("Time:", this.toMicroseconds(), "μs");
        } else {
            console.log("Time:", this.toNanoseconds(), "ns");
        }
    }

    // Функция для парсинга строковых значений времени в наносекунды
    static parse(timeString: string): Time {
        const regex = /^(\d+)(s|ms|μs|ns)$/; // Регулярное выражение для разбора строки времени
        const matches = timeString.match(regex);

        if (!matches) {
            throw new Error("Неверный формат строки времени.");
        }

        const value = parseInt(matches[1]);
        const unit = matches[2] as TimeUnit;

        let nanoseconds: number;

        switch (unit) {
            case "s":
                nanoseconds = value * 1e9;
                break;
            case "ms":
                nanoseconds = value * 1e6;
                break;
            case "μs":
                nanoseconds = value * 1e3;
                break;
            case "ns":
                nanoseconds = value;
                break;
            default:
                throw new Error("Неизвестная единица времени.");
        }

        return new Time(nanoseconds);
    }
}