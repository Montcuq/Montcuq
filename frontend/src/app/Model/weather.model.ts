export class Weather {
    current: Current;
}
class Current {
    condition: Condition;
    temp_c: string;
}

class Condition {
    icon: string;
}
