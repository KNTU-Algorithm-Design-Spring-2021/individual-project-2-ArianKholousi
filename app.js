const dict = require('./words_dictionary.json')


function isValid(word) {
    // JavaScript objects are implemented using Hash tables under the hood
    if (dict[word.toLowerCase()])
        return true;
    return false;
}

function wordBreak(s, start, end, dp) {

    if (!dp) {
        // initalize dp table with size n*n and values -1.
        // which means all of the values are not seen yet
        dp = new Array(s.length).fill(new Array(s.length).fill(-1))
    }

    // if the word is valid return 1
    if (isValid(s.substr(start, end - start + 1))) {
        dp[start][end] = 1;
        let word = s.substr(start, end - start + 1)
        result += word + ' '
        return 1;
    }

    for (let i = start + 1; i < end; i++) {
        // if the subproblem is seen for the first time
        if (dp[start][i] == -1) {
            dp[start][i] = wordBreak(s, start, i, dp);
        }
        // if word is valid, we check the rest of the string
        if (dp[start][i] == 1) {
            dp[i + 1][end] = wordBreak(s, i + 1, end, dp);
            if (dp[start][i] == 1 && dp[i + 1][end] == 1) {
                // if both parts are ok, return 1
                return 1;
            }
        }
    }

    // can not separate the word
    dp[start][end] = 0;
    return 0;
}

let string = 'heishappy'
let result = ''
let wb = wordBreak(string, 0, string.length);

// if wordbreak is ok, print he result
console.log(wb ? result : "can't separate")
