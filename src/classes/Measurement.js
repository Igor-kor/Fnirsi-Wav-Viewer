export class Measurement {
    constructor(view, startByte) {
        this.VMax = this.readMidBigEndianInt32(view,startByte); // true указывает на little endian
        this.VMin = this.readMidBigEndianInt32(view,startByte + 4);
        this.Vavg = this.readMidBigEndianInt32(view,startByte + 8);
        this.Vrms =this.readMidBigEndianInt32(view,startByte + 12);
        this.Vpp = this.readMidBigEndianInt32(view,startByte + 16);
        this.Vp = this.readMidBigEndianInt32(view,startByte + 20);
        this.Freq = this.addConversionIfNeeded( this.interpretFrequency(this.readMidBigEndianInt32(view, startByte + 24))) ;
        this.Cysle = this.readMidBigEndianInt32(view,startByte + 28);
        this.TimePlus = this.readMidBigEndianInt32(view,startByte + 32);
        this.TimeMinus = this.readMidBigEndianInt32(view,startByte + 36);
        this.DutyPlus = this.readMidBigEndianInt32(view,startByte + 40);
        this.DutyMinus = this.readMidBigEndianInt32(view,startByte + 44);
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
    // todo: need fix bug with Mhz as Khz
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