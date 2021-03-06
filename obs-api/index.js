"use strict";
exports.__esModule = true;
var electron = window['require']('electron');
var remote = electron.remote;
var obs = remote.require('obs-studio-node');
/* Convenient paths to modules */
exports.DefaultD3D11Path = obs.DefaultD3D11Path;
exports.DefaultDrawPluginPath = obs.DefaultDrawPluginPath;
exports.DefaultBinPath = obs.DefaultBinPath;
exports.DefaultDataPath = obs.DefaultDataPath;
exports.DefaultPluginPath = obs.DefaultPluginPath;
exports.DefaultPluginDataPath = obs.DefaultPluginDataPath;
exports.Global = obs.Global;
exports.InputFactory = obs.InputFactory;
exports.SceneFactory = obs.SceneFactory;
exports.FilterFactory = obs.FilterFactory;
exports.TransitionFactory = obs.TransitionFactory;
exports.DisplayFactory = obs.DisplayFactory;
exports.VolmeterFactory = obs.VolmeterFactory;
exports.FaderFactory = obs.FaderFactory;
exports.VideoFactory = obs.VideoFactory;
exports.ModuleFactory = obs.ModuleFactory;
exports.addItems = obs.addItems;
exports.createSources = obs.createSources;
exports.getSourcesSize = obs.getSourcesSize;
