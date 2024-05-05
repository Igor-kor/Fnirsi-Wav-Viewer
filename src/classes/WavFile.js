import {Measurement} from "@/classes/Measurement.js";
import {TimeScale} from "@/classes/TimeScale.js";

export class WavFile {
    YAxysOffset = 200;
    parsedData = {}
    constructor() {

    }
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const binaryData = new Uint8Array(reader.result);
                this.parseBinaryFile(binaryData);
                resolve(this.parsedData);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsArrayBuffer(file);
        });
    }
    parseBinaryFile(data) {
        const view = new DataView(data.buffer);
        this.parsedData = {
            // Реализация вашего алгоритма парсинга
            // Например:
            header: this.parseHeader(view),
            CH1Measurement: new Measurement(view, 208),
            CH2Measurement: new Measurement(view, 256),
            CH1Data1: this.parseChannelData(view, 1000, 3999),
            CH2Data1: this.parseChannelData(view, 4000, 6999),
            CH1Data2: this.parseChannelData(view, 7000, 8499),
            CH2Data2: this.parseChannelData(view, 8500, 9999),
            OverData: this.parseChannelData(view, 10000, 14999)

        };
    }
    parseHeader(view) {
        const headerData = {};

        // CH1 vertical scale
        const ch1VerticalScale = view.getInt8(4);
        headerData.CH1VerticalScale = this.parseVerticalScale(ch1VerticalScale);

        // CH1 coupling
        const ch1Coupling = view.getInt8(8);
        headerData.CH1Coupling = this.parseCoupling(ch1Coupling);

        // CH1 probe
        const ch1Probe = view.getInt8(10);
        headerData.CH1Probe = this.parseProbe(ch1Probe);

        // CH2 vertical scale
        const ch2VerticalScale = view.getInt8(14);
        headerData.CH2VerticalScale = this.parseVerticalScale(ch2VerticalScale);

        // CH2 coupling
        const ch2Coupling = view.getInt8(18);
        headerData.CH2Coupling = this.parseCoupling(ch2Coupling);

        // CH2 probe
        const ch2Probe = view.getInt8(20);
        headerData.CH2Probe = this.parseProbe(ch2Probe);

        // Time scale
        const timeScale = view.getInt8(22);
        headerData.TimeScale = new TimeScale(timeScale);

        // Scroll speed
        headerData.ScrollSpeed = this.parseScrollSpeed(view.getInt8(24));

        // Trigger type
        const triggerType = view.getInt8(26);
        headerData.TriggerType = this.parseTriggerType(triggerType);

        // Trigger edge
        const triggerEdge = view.getInt8(28);
        headerData.TriggerEdge = this.parseTriggerEdge(triggerEdge);

        // Screen Brightness
        headerData.ScreenBrightness = view.getInt8(120);

        // Grid Brightness
        headerData.GridBrightness = view.getInt8(122);

        return headerData;
    }
    parseVerticalScale(value) {
        const scales = [5.0, 2.5, 1.0, 0.5, 0.2, 0.1, 0.05];
        return scales[value] || "Unknown";
    }
    parseCoupling(value) {
        return value === 0 ? "DC" : "AC";
    }
    parseProbe(value) {
        const probes = ["x1", "x10", "x100"];
        return probes[value] || "Unknown";
    }
    parseTriggerType(value) {
        const types = ["Auto", "Single", "Normal"];
        return types[value] || "Unknown";
    }
    parseTriggerEdge(value) {
        return value === 0 ? "RISING" : "FALLING";
    }
    parseScrollSpeed(value) {
        return value === 0 ? "Fast" : "Slow";
    }
    parseChannelData(view, start, end) {
        const channelData = [];
        for (let i = start; i <= end; i += 4) {
            // 2 byte fields (little endian). Values range from 0 to 399 where level 200 represents 0
            const value = view.getUint16(i,true) - this.YAxysOffset;
            channelData.push(value);
        }
        return channelData;
    }
}