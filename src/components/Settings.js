import _ from 'lodash';
import t from 'tcomb-form';
import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

import SyncerFactory from '../syncers/SyncerFactory';

import settings from '../utils/settings';
import toshoStore from '../utils/store';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        // General
        hummingbirdUsername: toshoStore.get('hummingbird.username'),
        hummingbirdPassword: toshoStore.get('hummingbird.password'),
        myanimelistUsername: toshoStore.get('myanimelist.username'),
        myanimelistPassword: toshoStore.get('myanimelist.password'),
        minimizeToTray: !!settings.get('minimizeToTray'),
        runOnStartup: !!settings.get('runOnStartup'),
        minimizedOnStartup: !!settings.get('minimizedOnStartup'),
        allowMetrics: !!toshoStore.get('allowMetrics'),

        // Media
        mediaFolders: settings.get('mediaFolders') || [],
        mediaDetection: !!settings.get('mediaDetection')
      }
    };
  }
  switchToHummingbird = () => {
    const hbSyncer = new SyncerFactory({
      username: toshoStore.get('hummingbird.username'),
      password: toshoStore.get('hummingbird.password')
    }, 'Hummingbird');

    this.props.createToast({
      id: 'hbswitch',
      type: 'loading',
      message: 'Switching to Hummingbird...',
    });
    hbSyncer.authenticate()
    .then(() => {
      return hbSyncer.getList('anime');
    })
    .then((animeList) => {
      this.props.syncList('hummingbird', animeList);
      this.props.switchList('hummingbird');
      this.props.switchSyncer(hbSyncer);
      this.props.updateToast({
        id: 'hbswitch',
        type: 'success',
        message: 'Switched to Hummingbird',
        timer: 3000
      });
    })
    .catch(() => {
      this.props.updateToast({
        id: 'hbswitch',
        type: 'failure',
        message: 'Invalid credentials!',
        timer: 3000
      });
    });
    this.setState({
      visible: false
    });
  }
  switchToMyAnimeList = () => {
    const malSyncer = new SyncerFactory({
      username: toshoStore.get('myanimelist.username'),
      password: toshoStore.get('myanimelist.password')
    }, 'MyAnimeList');

    this.props.createToast({
      id: 'malswitch',
      type: 'loading',
      message: 'Switching to MyAnimeList...',
    });
    let completeList = [];
    malSyncer.authenticate()
    .then(() => {
      return malSyncer.getList('anime');
    })
    .then((animeList) => {
      completeList = completeList.concat(animeList);
      return malSyncer.getList('manga');
    })
    .then((mangaList) => {
      this.props.syncList('myanimelist', completeList.concat(mangaList));
      this.props.switchList('myanimelist');
      this.props.switchSyncer(malSyncer);
      this.props.updateToast({
        id: 'malswitch',
        type: 'success',
        message: 'Switched to MyAnimeList',
        timer: 3000
      });
    })
    .catch(() => {
      this.props.updateToast({
        id: 'malswitch',
        type: 'failure',
        message: 'Invalid credentials!',
        timer: 3000
      });
    });
    this.setState({
      visible: false
    });
  }
  switchToToshocat = () => {
    this.props.switchSyncer(null);
    this.props.switchList('toshocat');
    this.props.createToast({
      id: 'toshoswitch',
      type: 'success',
      message: 'Switched to Toshocat (offline mode)',
      timer: 3000
    });
    this.setState({
      visible: false
    });
  }
  handleChange = () => {
    const generalSettings = this.refs.generalForm.getValue();
    const mediaSettings = this.refs.mediaForm.getValue();
    const newSettings = _.merge({}, generalSettings, mediaSettings);

    toshoStore.set('myanimelist.username', newSettings.myanimelistUsername);
    toshoStore.set('myanimelist.password', newSettings.myanimelistPassword);
    toshoStore.set('hummingbird.username', newSettings.hummingbirdUsername);
    toshoStore.set('hummingbird.password', newSettings.hummingbirdPassword);

    settings.set({
      minimizeToTray: newSettings.minimizeToTray,
      runOnStartup: newSettings.runOnStartup,
      minimizedOnStartup: newSettings.minimizedOnStartup,
      allowMetrics: newSettings.allowMetrics,
      // Returns "Struct" from tcomb (not what we want)
      // Hack around it and use state value instead
      mediaFolders: newSettings.mediaFolders,
      mediaDetection: newSettings.mediaDetection
    });
  }
  render() {
    // Everything needs to eventually be refactored
    const formSchemaGeneral = t.struct({
      minimizeToTray: t.Boolean,
      runOnStartup: t.Boolean,
      minimizedOnStartup: t.Boolean,
      allowMetrics: t.Boolean
    });
    const formSchemaServices = t.struct({
      myanimelistUsername: t.maybe(t.String),
      myanimelistPassword: t.maybe(t.String),
      hummingbirdUsername: t.maybe(t.String),
      hummingbirdPassword: t.maybe(t.String),
    });
    const filePickerTemplate = (locals) => {
      const selectFolder = (e) => {
        e.preventDefault();
        const { dialog } = remote;
        dialog.showOpenDialog({
          title: 'Select a media folder',
          properties: ['openDirectory']
        }, (paths) => {
          if (paths && paths.length > 0) {
            this.setState({
              value: _.merge({}, this.state.value, {
                mediaFolders: _.uniq(
                  _.concat(this.state.value.mediaFolders, paths)
                  .filter(path => _.isString(path))
                )
              })
            });
            this.handleChange();
          }
        });
      };
      return (
        <div className="settings-mediafolder">
          <div className="settings-mediafolder-title">
            Media folders
          </div>
          <div className="help-block">
            Toshocat will be able to directly open episodes from your selected media folders.
          </div>
          <div>
            {
              locals.items.length === 0 ?
                <div className="mediafolders-empty">
                  There are currently no added media folders
                </div>
              : null
            }
            {
              locals.items.map((item) => {
                return (
                  <div className="cf">
                    {item.input}
                    {
                      item.buttons.map((button) => {
                        return (
                          <button
                            onClick={button.click}
                            type="button"
                            className="mediafolder-action"
                          >
                            {button.label}
                          </button>
                        );
                      })
                    }
                  </div>
                );
              })
            }
          </div>
          <button
            onClick={selectFolder}
            className="settings-mediafolder-add"
          >
            Add new media folder
          </button>
        </div>
      );
    };

    const filePathTemplate = t.form.Form.templates.textbox.clone({
      // override just the input default implementation (labels, help, error will be preserved)
      renderInput: (locals) => {
        return (
          <input
            className="mediafolder-input"
            type="text"
            disabled
            value={locals.value}
          />
        );
      }
    });

    const formSchemaMedia = t.struct({
      mediaDetection: t.maybe(t.Boolean),
      mediaFolders: t.list(t.String)
    });

    const formOptions = {
      fields: {
        hummingbirdUsername: {
          label: 'Hummingbird username'
        },
        hummingbirdPassword: {
          label: 'Hummingbird password',
          type: 'password'
        },
        myanimelistUsername: {
          label: 'MyAnimeList username'
        },
        myanimelistPassword: {
          label: 'MyAnimeList password',
          type: 'password'
        },
        minimizeToTray: {
          label: 'Minimize Toshocat to tray when I click "X"',
          help: 'The tray usually located in the bottom-right in the Windows taskbar.'
        },
        runOnStartup: {
          label: 'Run Toshocat on Windows startup'
        },
        minimizedOnStartup: {
          label: 'Keep Toshocat minimized if run on startup',
          help: 'Toshocat will instead be launched in the tray on startup.'
        },
        mediaDetection: {
          label: 'Enable media detection (scrobbling)',
          help: `A small notification will pop up when you watch series with VLC/MPC and allow you
          to quickly update your list.`
        },
        mediaFolders: {
          template: filePickerTemplate,
          label: 'Media folders',
          help: 'Toshocat will be able to directly open episodes from your media folders.',
          item: {
            template: filePathTemplate
          }
        },
        allowMetrics: {
          label: 'Send stats (anonymously) to Toshocat. Used to improve the application.',
          help: `We are only trying to determine things like "how often is this button clicked".
          Your private information stays with you.`
        }
      }
    };

    return (
      <div className="settings">
        <div className="settings-section">
          <div className="settings-title">
            General settings
          </div>
          <form onSubmit={this.handleSubmit}>
            <t.form.Form
              ref="generalForm"
              type={formSchemaGeneral}
              options={formOptions}
              onChange={this.handleChange}
              value={this.state.value}
            />
          </form>
          <div className="settings-title">
            Media settings
          </div>
          <form onSubmit={this.handleSubmit}>
            <t.form.Form
              ref="mediaForm"
              type={formSchemaMedia}
              options={formOptions}
              onChange={this.handleChange}
              value={this.state.value}
            />
          </form>
        </div>
        <div className="settings-section">
          <div className="settings-title">
            Service credentials
          </div>
          <t.form.Form
            ref="generalForm"
            type={formSchemaServices}
            options={formOptions}
            onChange={this.handleChange}
            value={this.state.value}
          />
          <div className="settings-title">
            Service actions
          </div>
          <div className="settings-services">
            {
              [{
                displayName: 'Toshocat',
                name: 'toshocat',
                handler: this.switchToToshocat,
                about: 'All data is stored locally.<br />No account required.'
              }, {
                displayName: 'MyAnimeList',
                name: 'myanimelist',
                handler: this.switchToMyAnimeList,
                about: 'List data is stored online. Requires an <br />account on MyAnimeList.com.'
              }, {
                displayName: 'Hummingbird',
                name: 'hummingbird',
                handler: this.switchToHummingbird,
                about: 'List data is stored online. Requires an <br />account on Hummingbird.me.'
              }].map((service) => {
                return (
                  <div
                    className={cx({
                      'settings-service': true,
                      current: this.props.currentListName === service.name
                    })}
                    key={`settings-service-${service.name}`}
                  >
                    <div className={`settings-service-icon ${service.name}`}></div>
                    <div className="settings-service-label">
                      {service.displayName}
                      <span className="settings-service-current">
                        Current
                      </span>
                    </div>
                    <div
                      className="settings-service-button"
                      onClick={service.handler}
                      data-tip={service.about}
                      data-tip-color="black"
                    >
                      Switch to {service.displayName}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  currentListName: PropTypes.string.isRequired,

  // Actions
  createToast: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  syncList: PropTypes.func.isRequired,
  switchList: PropTypes.func.isRequired,
  switchSyncer: PropTypes.func.isRequired
};

export default Settings;
