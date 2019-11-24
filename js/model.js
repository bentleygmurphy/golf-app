class ScoreCardContainer {
    constructor() {
        this.collection = [];
    }
    add(courseId) {
        this.collection.push(new ScoreCard(courseId));
    }
}

myScoreCards = new ScoreCardContainer();

class ScoreCard {
    constructor(courseId) {
        this.courseId = courseId;
        this.tee = 0;
        this.holes = 18;
        this.collection = [];
    }
    add(id) {
        this.collection.push(new Player(id))
    }
}

class Player {
    constructor(id) {
        this.id = id;
        this.name = name;
        this.score = {}; //hole id, par, score
        this.handicap = 0;
        this.frontNine = 0;
        this.backNine = 0;
    }
    //calculate stuff methods
}