export class ParsedData {
    constructor(header, CH1Measurement, CH2Measurement, CH1Data1, CH2Data1, CH1Data2, CH2Data2, OverData) {
        this.header = header;
        this.CH1Measurement = CH1Measurement;
        this.CH2Measurement = CH2Measurement;
        this.CH1Data1 = CH1Data1;
        this.CH2Data1 = CH2Data1;
        this.CH1Data2 = CH1Data2;
        this.CH2Data2 = CH2Data2;
        this.OverData = OverData;
    }
    header= {}
    CH1Measurement= {}
    CH2Measurement= {}
    CH1Data1={}
    CH2Data1={}
    CH1Data2={}
    CH2Data2={}
    OverData={}
}