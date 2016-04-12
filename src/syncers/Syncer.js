class Syncer {
  constructor(credentials, APIBase) {
    this.credentials = credentials;
    this.APIBase = APIBase;
    this.authenticated = false;
  }
  authenticate() {}
  getList() {}
  updateListItem() {}
}

export default Syncer;
