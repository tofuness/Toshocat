import _ from 'lodash';
import t from 'tcomb-form';
import React, { Component, PropTypes } from 'react';

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
  handleChange = () => {
    const generalSettings = this.refs.generalForm.getValue();
    const mediaSettings = this.refs.mediaForm.getValue();
    const newSettings = _.merge({}, generalSettings, mediaSettings);

    console.log(newSettings);

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
      myanimelistUsername: t.maybe(t.String),
      myanimelistPassword: t.maybe(t.String),
      hummingbirdUsername: t.maybe(t.String),
      hummingbirdPassword: t.maybe(t.String),
      minimizeToTray: t.Boolean,
      runOnStartup: t.Boolean,
      minimizedOnStartup: t.Boolean,
      allowMetrics: t.Boolean
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
          label: 'Minimize Toshocat to tray when I click "X"'
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
        </div>
        <div className="settings-section">
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
      </div>
    );
  }
}

Settings.propTypes = {
  createToast: PropTypes.func.isRequired
};

export default Settings;
