export class Measurement {
    constructor(view, startByte) {
        this.VMax = view.getFloat32(startByte, true); // true указывает на little endian
        this.VMin = view.getFloat32(startByte + 4, true);
        this.Vavg = view.getFloat32(startByte + 8, true);
        this.Vrms = view.getFloat32(startByte + 12, true);
        this.Vpp = view.getFloat32(startByte + 16, true);
        this.Vp = view.getFloat32(startByte + 20, true);
        this.Freq = view.getFloat32(startByte + 24, true);
        this.Cysle = view.getFloat32(startByte + 28, true);
        this.TimePlus = view.getFloat32(startByte + 32, true);
        this.TimeMinus = view.getFloat32(startByte + 36, true);
        this.DutyPlus = view.getFloat32(startByte + 40, true);
        this.DutyMinus = view.getFloat32(startByte + 44, true);
    }
}