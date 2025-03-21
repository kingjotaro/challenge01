const units = require('./units');
const stringSimilarity = require('string-similarity');

// removes common units of measurement for comparison purposes.
const removeUnits = (productName) => {
  const regex = new RegExp(`\\b(${units.join('|')})\\b`, 'gi'); // Criando regex dinâmica

  return productName.replace(regex, '').replace(/\s+/g, ' ').trim(); // Remove duplos espaços e ajusta a string
};

//function that "cleans" the string to make comparisons easier. applying rules with specif regexes
const clearString = (str) => {
  return str
    .normalize('NFD') //separates base letters from their diacritics
    .replace(/[\u0300-\u036f]/g, '') // removes accents
    .replace(/[^a-zA-Z0-9 ]/g, ' ') // removes special characters, keeping only letters, spaces and numbers
    .replace(/\b[a-zA-Z]\b\s*/g, '') // removes single-letter words and trailing spaces
    .replace(/\s+/g, ' ') // replaces multiple spaces with a single space
    .trim(); // removes leading and trailing spaces
};

// function that returns the similarity percentage of two strings, using the 'string-similarity' lib. It uses the Sorensen-Dice similarity coefficient, which is based on the count of bigrams (pairs of consecutive characters).
const getStringSimilarity = (str1, str2) =>
  Number((stringSimilarity.compareTwoStrings(str1, str2) * 100).toFixed(2));

// function that returns the similarity percentage of two keywords for more specific comparation
const getKeywordSimilarity = (str1, str2) => {
  const str1WithoutUnits = removeUnits(clearString(str1).replace(/\d+/g, ''));
  const str2WithoutUnits = removeUnits(clearString(str2).replace(/\d+/g, ''));

  const wordsA = new Set(str1WithoutUnits.toLowerCase().split(' '));
  const wordsB = new Set(str2WithoutUnits.toLowerCase().split(' '));

  const intersection = [...wordsA].filter((word) => wordsB.has(word)).length;

  const totalWords = new Set([...wordsA, ...wordsB]).size;
  const keywordsSimilarity = (intersection / totalWords) * 100;

  return keywordsSimilarity;
};

module.exports = {
  removeUnits,
  clearString,
  getStringSimilarity,
  getKeywordSimilarity,
};
