/*
IchBinJade
AoC Day 2 - https://adventofcode.com/2023/day/2
2023-12-09
*/

import { getArrayFromFile } from "../utils.js"

const maxColours = {
    red: 12,
    green: 13,
    blue: 14
};

function calulateGameIdSum(gameIdArray) {
    // Return sum of game Id's
    let sum = 0;
    gameIdArray.forEach(gameId => {
      sum += parseInt(gameId);
    });
    return sum;
  }

function partOne(inputPath) {
    const inpArr = getArrayFromFile(inputPath);
  let games = {};

  // Loop array and strip the games from each line, using it as a new key in games.
  for (let i = 0; i < inpArr.length; i++) {
    const gameSections = inpArr[i].split(": ");
    const parseGameId = gameSections[0].trim();
    const gameId = parseGameId.replace(/\D/g, "")
    const subsets = gameSections[1].split(";");
    games[gameId] = {
      red: 0,
      green: 0,
      blue: 0,
    };

    // Loop subsets and find the max value for each colour according to the max value from the subset
    for (const subset of subsets) {
      // Match "amount color" expression globally
      const matches = subset.match(/(\d+) (\w+)/g);

      if (matches) {
        for (const match of matches) {
          const [_, parseAmount, colour] = /(\d+) (\w+)/.exec(match);
          const amount = parseInt(parseAmount, 10);
          if (colour === "red") {
            games[gameId].red = Math.max(games[gameId].red, amount);
          } else if (colour === "green") {
            games[gameId].green = Math.max(games[gameId].green, amount);
          } else if (colour === "blue") {
            games[gameId].blue = Math.max(games[gameId].blue, amount);
          }
        }
      }
    }
  }
  // Get array of game id's that have values that don't exceed the values in maxColours
  const gameIdArray = Object.keys(games).filter(gameId => {
    return games[gameId].red <= maxColours.red &&
      games[gameId].green <= maxColours.green &&
      games[gameId].blue <= maxColours.blue;
  });
  return calulateGameIdSum(gameIdArray);
}

function partTwo(inputPath) {}

console.log(`Part 1: ${partOne("./input.txt")}`);
//console.log(`Part 2: ${partTwo("./input.txt")}`);