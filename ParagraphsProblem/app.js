function printSolution(p, n) {
    let k;
    if (p[n] == 1)
        k = 1;
    else
        k = printSolution(p, p[n] - 1) + 1;
    console.log("Line number " + k + " : From word " + p[n] + " to " + n);
    return k;
}

const MAX = Number.MAX_VALUE;

function wordWrap(wordSize, n, m) {
    // for simplicity, array lengths are n + 1
    let extraSpace = new Array(n + 1).fill(new Array(n + 1).fill(0))
    let lineCost = new Array(n + 1).fill(new Array(n + 1).fill(0))
    let minCost = new Array(n + 1);
    
    // to print the solution.
    let p = new Array(n + 1);

    // calc extra spaces in a single line
    for (let i = 1; i <= n; i++) {
        extraSpace[i][i] = m - wordSize[i - 1];
        for (let j = i + 1; j <= n; j++)
            extraSpace[i][j] = extraSpace[i][j - 1] - wordSize[j - 1] - 1;
    }

    // calc line cost
    for (let i = 1; i <= n; i++) {
        for (let j = i; j <= n; j++) {
            if (extraSpace[i][j] < 0)
                lineCost[i][j] = MAX;
            else if (j == n && extraSpace[i][j] >= 0)
                lineCost[i][j] = 0;
            else
                lineCost[i][j] = extraSpace[i][j] * extraSpace[i][j] * extraSpace[i][j]
        }
    }

    // calc minimum cost
    minCost[0] = 0;
    for (let j = 1; j <= n; j++) {
        minCost[j] = MAX;
        for (let i = 1; i <= j; i++) {
            if (minCost[i - 1] != MAX && lineCost[i][j] != MAX && (minCost[i - 1] + lineCost[i][j] < minCost[j])) {
                minCost[j] = minCost[i - 1] + lineCost[i][j];
                p[j] = i;
            }
        }
    }
    printSolution(p, n);
}

// testCase
let wordSize = [3, 2, 2, 6];
let n = wordSize.length;
let m = 6;
wordWrap(wordSize, n, m);
