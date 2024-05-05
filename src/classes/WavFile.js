import {Measurement} from "@/classes/Measurement.js";
import {Header} from "@/classes/Header.js";

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
    // file format https://github.com/roberttidey/FNISR1013DScope/blob/master/FileFormat.txt
    parseBinaryFile(data) {
        const view = new DataView(data.buffer);
        this.parsedData = {
            header: new Header(view),
            CH1Measurement: new Measurement(view, 208),
            CH2Measurement: new Measurement(view, 256),
            CH1Data1: this.parseChannelData(view, 1000, 3999),
            CH2Data1: this.parseChannelData(view, 4000, 6999),
            CH1Data2: this.parseChannelData(view, 7000, 8499),
            CH2Data2: this.parseChannelData(view, 8500, 9999),
            OverData: this.parseChannelData(view, 10000, 14999)
        };
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