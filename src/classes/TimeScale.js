
export class TimeScale {

    constructor(value) {
        this.value = value;
    }
    value = "Unknown"
    scales3 = [
        50000000000, 20000000000, 10000000000, 5000000000, 2000000000, 1000000000, 500000000, 200000000,
        100000000, 50000000, 20000000, 10000000, 5000000, 2000000, 1000000,
        500000, 200000, 100000, 50000, 20000, 10000, 5000,
        2000, 1000, 500,200, 100, 50, 20, 10
    ];

    scales4 = [
        50, 20, 10, 5, 2, 1, 500, 200,
        100, 50, 20, 10, 5, 2, 1,
        500, 200, 100, 50, 20, 10, 5,
        2, 1, 500, 200, 100, 50, 20, 10
    ];

    scales1 = [
        "50", "20", "10", "5", "2", "1", "500", "200",
        "100", "50", "20", "10", "5", "2", "1",
        "500", "200", "100", "50", "20", "10", "5",
        "2", "1", "500", "200", "100", "50", "20", "10"
    ];

    scales2 = [
        "S", "S", "S", "S", "S", "S", "mS", "mS",
        "mS", "mS", "mS", "mS", "mS", "mS", "mS",
        "uS", "uS", "uS", "uS", "uS", "uS", "uS",
        "uS", "uS", "nS", "nS", "nS", "nS", "nS", "nS"
    ];


    static parseTimeScale(value) {
        return this.scales1[value] || "Unknown";
    }

    GetStringTimeScale(){
        return this.scales1[this.value]+this.scales2[this.value]  || "Unknown";
    }
    GetValueTimeScale(){
        return this.scales1[this.value] || "Unknown";
    }
    GetValueInnSTimeScale(){
        return this.scales3[this.value] || "Unknown";
    }
    GetPrefixTimeScale(){
        return this.scales2[this.value] || "Unknown";
    }

    GetScalePoint(){
        const step = this.scales4[this.value] / 50;
        const result = [];
        for (let i = 0; i < 750; i++) {
            result.push((step * i).toFixed(2)+ this.GetPrefixTimeScale());
        }
        return result;
    }


}
