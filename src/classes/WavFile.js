import {Measurement} from "@/classes/Measurement.js";
import {Header} from "@/classes/Header.js";
import {ParsedData} from "@/classes/ParsedData.js";

export class WavFile {
    YAxysOffset = 200;
    parsedData = {};
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
        this.parsedData = new ParsedData(
            new Header(view),
            new Measurement(view, 208),
            new Measurement(view, 256),
            this.parseChannelData(view, 1000, 3999,this.YAxysOffset),
            this.parseChannelData(view, 4000, 6999,this.YAxysOffset),
            this.parseChannelData(view, 7000, 8499,this.YAxysOffset),
            this.parseChannelData(view, 8500, 9999,this.YAxysOffset),
            this.parseChannelData(view, 10000, 14999)
        )
    };
    parseChannelData(view, start, end, offset= 0) {
        const channelData = [];
        for (let i = start; i <= end; i += 4) {
            // 2 byte fields (little endian). Values range from 0 to 399 where level 200 represents 0
            const value = view.getUint16(i,true) - offset;
            channelData.push(value);
        }
        return channelData;
    }
}