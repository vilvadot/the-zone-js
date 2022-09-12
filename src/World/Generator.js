import ROT from '../lib/rot.js'

export class Generator{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.engine = new ROT.Map.Cellular(width, height);
    }

    setSeed(seed){
        ROT.RNG.setSeed(seed);
        return this
    }

    generate(callback){
        return this.engine.randomize(0.4).create(callback)
    }
}