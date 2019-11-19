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
        this.handicap = 0;
        this.score = {};
    }
}