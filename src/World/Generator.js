import ROT from '../lib/rot.js'

export class Generator{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.engine = new ROT.Map.Cellular(width, height);
    }

    generate(callback){
        return this.engine.randomize(0.4).create(callback)
    }
}