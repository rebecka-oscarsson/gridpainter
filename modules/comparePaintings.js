function compare(original, copy) {
    let matchingTiles = 0;
    for (index in original) {
        if (original[index].color === copy[index].color) {
            matchingTiles += 1
        }      
    }
    let matchPercentage = matchingTiles/225
    console.log("antal matchande rutor: ", matchPercentage);
    return matchPercentage
}

module.exports = compare