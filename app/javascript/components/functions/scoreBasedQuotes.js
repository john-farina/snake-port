export default function scoreBasedQuotes(score) {
  if (score <= 10) {
    return "You Stink, Loser!";
  }

  if (score >= 10 && score <= 30) {
    return "Nice Job, Winner!";
  }

  if (score >= 70) {
    return "Alright nice job, now go outside";
  }
}
