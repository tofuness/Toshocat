export default {
  /**
   * Modulo that supports negative numbers
   * @param  {Number} n Dividend
   * @param  {Number} m Divisor
   * @return {Number}   Remainder
   */
  mod: (n, m) => {
    return ((n % m) + m) % m;
  },
  /**
   * Naive way of determining if a series is
   * an anime.
   * @param  {String} type Type of series
   * @return {Boolean}     True if anime, false if not
   */
  isAnime: (type) => {
    return ['tv', 'movie', 'ova', 'special', 'ona', 'music'].indexOf(type) > -1;
  },
  /**
   * Validate a url
   * @param  {String}  string
   * @return {Boolean}        True if string is a valid url
   */
  isUrl(string) {
    return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(string);
  }
};
