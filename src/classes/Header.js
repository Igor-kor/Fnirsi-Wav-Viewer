import {TimeScale} from "@/classes/TimeScale.js";

export class Header {
    constructor(view) {
        this.parseHeader(view)
    }
    parseHeader(view) {
        // new values unknown
        this.Valuex = view.getInt8(30); // ch2 ???
        this.Valuex1 = view.getInt8(36); // 1
        this.Valuex2 = view.getInt8(38); // 1
        this.Valuex3 = view.getInt8(40); // 6
        this.Valuex4 = view.getInt8(42); // -70
        this.Valuex5 = view.getInt8(48); // -112
        this.Valuex6 = view.getInt8(50); // -112
        this.Valuex7 = view.getInt8(52); // 28/14....
        this.Valuex8 = view.getInt8(56); // -1
        this.Valuex9 = view.getInt8(58); // -1
        this.Valuex10 = view.getInt8(60); // -1
        // 56 -  78 // value -1 (FF)
        this.Valuex11 = view.getInt8(80); // 3/23/97
        this.Valuex12 = view.getInt8(82); // - 56/ -50 / -40
        this.Valuex13 = view.getInt8(84); // - 56
        this.Valuex14 = view.getInt8(86); // - 55 /14/102
        // 88 - 119 // value -1 (FF)
        this.Valuex15 = view.getInt8(124); // 1

        this.Valuex16 = view.getInt8(160); // 5
        this.Valuex17 = view.getInt8(162); // 3
        this.Valuex18 = view.getInt8(164); // 7
        this.Valuex19 = view.getInt8(166); // 18
        this.Valuex20 = view.getInt8(168); // 15
        this.Valuex21 = view.getInt8(170); // 19

        this.Valuex100 = view.getInt8(400); // ??
        this.Valuex101 = view.getInt8(402); // ??
        this.Valuex102 = view.getInt8(404); // 6/1
        this.Valuex103 = view.getInt8(406); // ??

        // CH1 on/off
        this.CH1ON = view.getInt8(2);

        // CH1 vertical scale
        this.CH1VerticalScale = this.parseVerticalScale(view.getInt8(4));

        // CH1 FFT
        this.CH1FFT = view.getInt8(6);

        // CH1 coupling
        this.CH1Coupling = this.parseCoupling( view.getInt8(8));

        // CH1 probe
        this.CH1Probe = this.parseProbe(view.getInt8(10));

        // CH2 on/off
        this.CH2ON = view.getInt8(12);

        // CH2 vertical scale
        this.CH2VerticalScale = this.parseVerticalScale( view.getInt8(14));

        // CH2 FFT
        this.CH2FFT = view.getInt8(16);

        // CH2 coupling
        this.CH2Coupling = this.parseCoupling(view.getInt8(18));

        // CH2 probe
        this.CH2Probe = this.parseProbe(view.getInt8(20));

        // Time scale
        this.TimeScale = new TimeScale(view.getInt8(22));

        // Scroll speed
        this.ScrollSpeed = this.parseScrollSpeed(view.getInt8(24));

        // Trigger type
        this.TriggerType = this.parseTriggerType(view.getInt8(26));

        // Trigger edge
        this.TriggerEdge = this.parseTriggerEdge(view.getInt8(28));

        // Screen Brightness
        this.ScreenBrightness = view.getInt8(120);

        // Grid Brightness
        this.GridBrightness = view.getInt8(122);

        // Draw XY axis
        this.XYMode = view.getInt8(126);

        // FF
        this.OtherData1 = this.parseData(view,408,499);

        // Zero
        this.OtherData2 = this.parseData(view,500,999);
    }
    parseData(view, start, end) {
        const channelData = [];
        for (let i = start; i <= end; i += 2) {
            const value = view.getUint16(i);
            channelData.push(value);
        }
        return channelData;
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
}