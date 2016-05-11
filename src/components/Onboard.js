import React, { Component, PropTypes } from 'react';

class Onboard extends Component {
  render() {
    return (
      <div className="onboard">
        <div className="onboard-step">
          <div className="onboard-step-header">
            <div className="onboard-step-title">
              Let's get started! Please select a primary service.
            </div>
            <div className="onboard-step-mouseprint">
              (You can easily change this later)
            </div>
          </div>
          <div className="onboard-step-actions">
            <div className="onboard-step-action">
              <div className="onboard-step-choice-image toshocat">
              </div>
              <div className="onboard-step-choice">
                Use Toshocat
              </div>
              <div className="onboard-step-choice-desc">
                No sign-ups. Recommended if you want privacy.
              </div>
            </div>
            <div className="onboard-step-action">
              <div className="onboard-step-choice-image hummingbird">
              </div>
              <div className="onboard-step-choice">
                Use Hummingbird
              </div>
              <div className="onboard-step-choice-desc">
                Requires an existing account on Hummingbird.me.
              </div>
            </div>
            <div className="onboard-step-action">
              <div className="onboard-step-choice-image myanimelist">
              </div>
              <div className="onboard-step-choice">
                Use MyAnimeList
              </div>
              <div className="onboard-step-choice-desc">
                Requires an existing account on MyAnimeList.com.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Onboard;
