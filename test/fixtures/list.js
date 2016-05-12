export default {
  list: [{
    _id: '56269140fd1db921d7955208',
    item: {
      item_status_text: 'Completed',
      item_status: 'completed',
      item_progress: 13,
      item_rating: 0
    }
  }, {
    _id: '562697fdfd1db921d7955828',
    item: {
      item_status_text: 'Planned',
      item_status: 'planned',
      item_progress: 0,
      item_rating: 0
    }
  }],
  item: {
    _id: '562696cbfd1db921d7955710',
    item: {
      item_status_text: 'Current',
      item_status: 'current',
      item_progress: 10,
      item_rating: 5,
      last_updated: ''
    }
  },
  outdated: {
    _id: '562696cbfd1db921d7955710',
    title: 'Heavy Object',
    item: {
      item_status_text: 'Current',
      item_status: 'current',
      item_progress: 10,
      item_rating: 5
    },
    mal_id: 123,
    last_updated: new Date('January 1988')
  },
  upToDate: {
    _id: '562696cbfd1db921d7955710',
    title: 'Heavy Object',
    item: {
      item_status_text: 'Current',
      item_status: 'current',
      item_progress: 10,
      item_rating: 5
    },
    mal_id: 123,
    last_updated: new Date('2050')
  }
};
