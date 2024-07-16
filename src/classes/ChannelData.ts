type VerticalScale = "5.0"| "2.5"| "1.0"| "0.5"| "0.2"| "0.1"| "0.05"
type Coupling = "DC"| "AC"
type Probe =  "x1"| "x10"| "x100"
type TimeScale =  "50S"|  "20S"|  "10S"|  "5S"|  "2S"|  "1S"|
    "500mS"| "200mS"| "100mS"| "50mS"| "20mS"| "10mS"| "5mS"| "2mS"| "1mS"|
    "500uS"| "200uS"| "100uS"| "50uS"| "20uS"| "10uS"| "5uS"| "2uS"| "1uS"|
    "500nS"| "200nS"| "100nS"| "50nS"| "20nS"| "10nS"
type ScrollSpeed = "Fast"| "Slow"
type TriggerType = "Auto"| "Single"| "Normal"
type TriggerEdge = "RISING"| "FALLING"

class ChannelData {
    ChON: boolean
    FFT: boolean
    VerticalScale : VerticalScale
    Coupling: Coupling
    Probe: Probe
    TimeScale: TimeScale
    ScrollSpeed: ScrollSpeed
    TriggerType: TriggerType
    TriggerEdge: TriggerEdge
    ScreenBrightness: number
    GridBrightness: number
    XYMode: boolean
    Data1: number[]
    Data2: number[]
    VMax: number
    VMin: number
    Vavg: number
    Vrms: number
    Vpp: number
    Vp: number
    Freq: Frequency
    Cysle: Time
    TimePlus: Time
    TimeMinus: Time
    DutyPlus: Percentage
    DutyMinus: Percentage
}