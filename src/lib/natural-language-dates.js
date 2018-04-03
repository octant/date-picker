export const SECONDS_IN_DAY = 60 * 60 * 24

const numericalWordValues = {
  one: 1,
  zero: 0,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  fourty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  hundred: 100,
  thousand: 1000,
  million: 1000000
}

export const wordGroups = {
  numerical: [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
    'hundred',
    'thousand',
    'million'
  ],
  past: [
    'ago',
    'last',
    'yesterday'
  ],
  present: [
    'now',
    'this',
    'today'
  ],
  future: [
    'from now',
    'next',
    'tomorrow'
  ],
  dateParts: [
    'day',
    'week',
    'month',
    'year'
  ],
  weekdays: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
}

const weekdays = /(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i

export const parse = (sentence) => {
  return new Date()
}
