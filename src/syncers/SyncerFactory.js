import HummingbirdSyncer from './HummingbirdSyncer';
import MyAnimeListSyncer from './MyAnimeListSyncer';

class SyncerFactory {
  constructor(credentials, syncerName) {
    switch (syncerName) {
      case 'Hummingbird':
        return new HummingbirdSyncer(credentials, 'https://dalian.toshocat.com/hummingbird');
      case 'MyAnimeList':
        return new MyAnimeListSyncer(credentials, 'https://atarashii.toshocat.com/2');
      default:
        break;
    }
    return false;
  }
}

export default SyncerFactory;
