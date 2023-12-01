class Exercise {
    constructor(id, name, sets, lowRepRange, highRepRange, imgSrc, color, del) {
        this.id = id;
        this.name = name;
        this.sets = sets;
        this.lowRepRange = lowRepRange;
        this.highRepRange = highRepRange;
        this.imgSrc = imgSrc;
        this.color = color;
        this.del = del;
    }
}

export default Exercise;