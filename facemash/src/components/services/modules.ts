const getRandomItem = (array:string[]): string => {
    const randomIdx = Math.floor(Math.random()*array.length);
    return array[randomIdx]
}

const probability = (leftRating: number, rightRating:number): number => {
    return 1.0 / (1 + Math.pow(10, (leftRating - rightRating) / 400));
}

// P represents the probability that the player with rightRating will win.

// In an Elo rating system, the probability is used to update ratings after a match:

// Higher-rated players are expected to win more often, so they gain fewer points when they win and lose more when they lose.
// Lower-rated players gain more points when they win against a higher-rated player and lose fewer points when they lose.
// This function is a standard way to calculate the expected result of a match based on Elo ratings.
const k = 32;
const eloRating = (leftRating:number, rightRating:number, win:boolean) => {
    const leftProb = probability(rightRating,leftRating);
    const rightProb = probability(leftRating,rightRating);

    //win true if left player won
    if(win) {
        leftRating += k*(1-leftProb)
        rightRating += k*(0-rightProb)
    } else {
        rightRating += k*(1-rightProb)
        leftRating += k*(0-leftProb)
    }

    return {leftRating, rightRating}
}

export default { getRandomItem, probability, k, eloRating };