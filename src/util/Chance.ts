export class Chance {
    static withProbability(probability, callback) {
        const roll = this.roll(probability)
        if (!roll) return
        callback()
    }
    
    private static roll(probability: number) {
        const diceRoll = Math.random();
        if (diceRoll * 100 <= probability) return true;
        return false;
    }
}