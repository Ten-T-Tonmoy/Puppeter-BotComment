const avgTotPub = " avg rating 4.47 — 10,845,545 ratings — published 1997 ";
let avgRating = "";
let ratingNumber = "";
let published = "";
let i = 0;
let one = true,
  two = true;
/**heckish unoptimized 
for (i; i < avgTotPub.length; i++) {
  if (avgTotPub[i] === "—" && one === true) one = false;
  if (avgTotPub[i] === "—" && one === false && two === true) two = false;
  if (one === true && avgTotPub[i] !== "—") avgRating += avgTotPub[i];
  if (two === true && one === false && avgTotPub[i] !== "—")
    ratingNumber += avgTotPub[i];
  if (one === false && two === false && avgTotPub[i] !== "—")
    published += avgTotPub[i];
}
*/

for (i; i < avgTotPub.length; i++) {
  if (avgTotPub[i] === "—") {
    if (one) {
      one = false;
    } else if (two) {
      two = false;
    }
    //its like procedural changing
    continue;
  }
  if (one) {
    avgRating += avgTotPub[i];
  } else if (two) {
    ratingNumber += avgTotPub[i];
  } else published += avgTotPub[i];
}
console.log(avgRating);
console.log(ratingNumber);
console.log(published);
