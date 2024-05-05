import {TimeScale} from "@/classes/TimeScale.js";

export class Header {
    constructor(view) {
        this.parseHeader(view)
    }
    parseHeader(view) {
        // CH1 vertical scale
        const ch1VerticalScale = view.getInt8(4);
        this.CH1VerticalScale = this.parseVerticalScale(ch1VerticalScale);

        // CH1 coupling
        const ch1Coupling = view.getInt8(8);
        this.CH1Coupling = this.parseCoupling(ch1Coupling);

        // CH1 probe
        const ch1Probe = view.getInt8(10);
        this.CH1Probe = this.parseProbe(ch1Probe);

        // CH2 vertical scale
        const ch2VerticalScale = view.getInt8(14);
        this.CH2VerticalScale = this.parseVerticalScale(ch2VerticalScale);

        // CH2 coupling
        const ch2Coupling = view.getInt8(18);
        this.CH2Coupling = this.parseCoupling(ch2Coupling);

        // CH2 probe
        const ch2Probe = view.getInt8(20);
        this.CH2Probe = this.parseProbe(ch2Probe);

        // Time scale
        const timeScale = view.getInt8(22);
        this.TimeScale = new TimeScale(timeScale);

        // Scroll speed
        this.ScrollSpeed = this.parseScrollSpeed(view.getInt8(24));

        // Trigger type
        const triggerType = view.getInt8(26);
        this.TriggerType = this.parseTriggerType(triggerType);

        // Trigger edge
        const triggerEdge = view.getInt8(28);
        this.TriggerEdge = this.parseTriggerEdge(triggerEdge);

        // Screen Brightness
        this.ScreenBrightness = view.getInt8(120);

        // Grid Brightness
        this.GridBrightness = view.getInt8(122);

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