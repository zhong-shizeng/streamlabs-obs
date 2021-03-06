
import {
  ISourceApi,
  TSourceType,
  ISource,
  SourcesService,
  TPropertiesManager,
  PROPERTIES_MANAGER_TYPES
} from './index';
import { mutation, ServiceHelper } from '../stateful-service';
import { Inject } from '../../util/injector';
import { ScenesService } from '../scenes';
import { TFormData } from '../../components/shared/forms/Input';
import Utils from '../utils';
import * as obs from '../../../obs-api';


@ServiceHelper()
export class Source implements ISourceApi {
  sourceId: string;
  name: string;
  type: TSourceType;
  audio: boolean;
  video: boolean;
  muted: boolean;
  width: number;
  height: number;
  doNotDuplicate: boolean;
  channel?: number;

  sourceState: ISource;

  @Inject()
  scenesService: ScenesService;

  /**
   * displayName can be localized in future releases
   */
  get displayName() {
    if (this.name === 'AuxAudioDevice1') return 'Mic/Aux';
    if (this.name === 'DesktopAudioDevice1') return 'Desktop Audio';
    const desktopDeviceMatch = /^DesktopAudioDevice(\d)$/.exec(this.name);
    const auxDeviceMatch = /^AuxAudioDevice(\d)$/.exec(this.name);

    if (desktopDeviceMatch) {
      const index = parseInt(desktopDeviceMatch[1], 10);
      return 'Desktop Audio' + (index > 1 ? ' ' + index : '');
    }

    if (auxDeviceMatch) {
      const index = parseInt(auxDeviceMatch[1], 10);
      return 'Mic/Aux' + (index > 1 ? ' ' + index : '');
    }

    return this.name;
  }


  getObsInput(): obs.IInput {
    return obs.InputFactory.fromName(this.sourceId);
  }

  getModel() {
    return this.sourceState;
  }

  updateSettings(settings: Dictionary<any>) {
    this.getObsInput().update(settings);
  }


  getSettings(): Dictionary<any> {
    return this.getObsInput().settings;
  }


  getPropertiesManagerType(): TPropertiesManager {
    return this.sourcesService.propertiesManagers[this.sourceId].type;
  }


  getPropertiesManagerSettings(): Dictionary<any> {
    return this.sourcesService.propertiesManagers[this.sourceId].manager.settings;
  }


  getPropertiesManagerUI(): string {
    return this.sourcesService.propertiesManagers[this.sourceId].manager.customUIComponent;
  }

  /**
   * Replaces the current properties manager on a source
   * @param type the type of the new properties manager
   * @param settings the properties manager settings
   */
  replacePropertiesManager(type: TPropertiesManager, settings: Dictionary<any>) {
    const oldManager = this.sourcesService.propertiesManagers[this.sourceId].manager;
    oldManager.destroy();

    const managerKlass = PROPERTIES_MANAGER_TYPES[type];
    this.sourcesService.propertiesManagers[this.sourceId].manager =
      new managerKlass(this.getObsInput(), settings);
    this.sourcesService.propertiesManagers[this.sourceId].type = type;
  }


  setPropertiesManagerSettings(settings: Dictionary<any>) {
    this.sourcesService.propertiesManagers[this.sourceId].manager.applySettings(settings);
  }


  getPropertiesFormData(): TFormData {
    const manager = this.sourcesService.propertiesManagers[this.sourceId].manager;
    return manager.getPropertiesFormData();
  }


  setPropertiesFormData(properties: TFormData) {
    const manager = this.sourcesService.propertiesManagers[this.sourceId].manager;
    manager.setPropertiesFormData(properties);
  }


  duplicate(): Source {
    if (this.doNotDuplicate) return null;
    return this.sourcesService.createSource(
      this.sourcesService.suggestName(this.name),
      this.type,
      this.getSettings()
    );
  }


  remove() {
    this.sourcesService.removeSource(this.sourceId);
  }

  setName(newName: string) {
    debugger;
    this.SET_NAME(newName);
    this.sourcesService.sourceUpdated.next(this.sourceState);
  }

  hasProps(): boolean {
    return this.getObsInput().configurable;
  }


  @Inject()
  protected sourcesService: SourcesService;

  constructor(sourceId: string) {
    // Using a proxy will ensure that this object
    // is always up-to-date, and essentially acts
    // as a view into the store.  It also enforces
    // the read-only nature of this data
    this.sourceState = this.sourcesService.state.sources[sourceId];
    Utils.applyProxy(this, this.sourcesService.state.sources[sourceId]);
  }

  @mutation()
  private SET_NAME(newName: string) {
    this.sourceState.name = newName;
  }
}
