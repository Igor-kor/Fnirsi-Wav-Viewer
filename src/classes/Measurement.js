export class Measurement {
    constructor(view, startByte) {
        this.VMax = view.getFloat32(startByte, true); // true указывает на little endian
        this.VMin = view.getFloat32(startByte + 4, true);
        this.Vavg = view.getFloat32(startByte + 8, true);
        this.Vrms = view.getFloat32(startByte + 12, true);
        this.Vpp = view.getFloat32(startByte + 16, true);
        this.Vp = view.getFloat32(startByte + 20, true);
        /*
        * 00 00 00 01 - 256 Mhz
        * 00 00 01 00 - 1 Mhz
        * 00 10 00 00 - 268 Khz
        * 00 01 00 00 - 16.7 Khz
        * 10 00 00 00 - 1.04 Khz
        * 00 00 e9 03 - 1 Khz
        * 01 00 18 87 - 100 hz
        * 01 00 00 00 - 65.5 hz
        * */
        this.Freq = this.addConversionIfNeeded( this.interpretFrequency(this.readMidBigEndianInt32(view, startByte + 24, true))) ;
        this.Cysle = view.getFloat32(startByte + 28, true);
        this.TimePlus = view.getFloat32(startByte + 32, true);
        this.TimeMinus = view.getFloat32(startByte + 36, true);
        this.DutyPlus = view.getFloat32(startByte + 40, true);
        this.DutyMinus = view.getFloat32(startByte + 44, true);
    }

    // Чтение 4 байт из массива байтов view в формате Mid-Big Endian как целое число (int)
    readMidBigEndianInt32(view, startByte) {
        var intValue = 0;
        intValue |= view.getUint8(startByte + 1) << 24; // Перестановка байтов
        intValue |= view.getUint8(startByte) << 16;
        intValue |= view.getUint8(startByte + 3) << 8;
        intValue |= view.getUint8(startByte + 2);
        return intValue;
    }

    // Функция для интерпретации и конвертации частоты
    interpretFrequency(value) {
        if (value >= 10000) {
            // Больше или равно 10000 герц
            return { value: value / 1000, unit: "Hz" };
        } else if (value >= 1000) {
            // От 1000 до 9999 герц
            return { value: value / 1000, unit: "KHz" };
        } else {
            // Меньше 1000 герц (от 1 до 999 герц)
            return { value: value, unit: "MHz" };
        }
    }

    // Функция для добавления преобразования, если число имеет много разрядов
    addConversionIfNeeded(frequencyInfo) {
        if (frequencyInfo.value >= 1000) {
            // Больше или равно 1000, нужно добавить преобразование
            var unitConversion = ["MHz", "KHz", "Hz"];
            var conversionIndex = 0;
            while (frequencyInfo.value >= 1000 && conversionIndex < unitConversion.length - 1) {
                frequencyInfo.value /= 1000;
                conversionIndex++;
            }
            frequencyInfo.unit = unitConversion[conversionIndex];
        }
        return frequencyInfo;
    }
}