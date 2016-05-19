import settings from './settings';
export default {
  formatRating(rating) {
    if (!rating) return '—';
    if (settings.get('tenRatingScale')) {
      return rating / 1;
    }
    return (rating / 2).toFixed(1);
  }
};
