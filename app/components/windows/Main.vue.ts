import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import TopNav from '../TopNav.vue';

// Pages
import Studio from '../pages/Studio.vue';
import Dashboard from '../pages/Dashboard.vue';
import BrowseOverlays from 'components/pages/BrowseOverlays.vue';
import Live from '../pages/Live.vue';
import Onboarding from '../pages/Onboarding.vue';
import TitleBar from '../TitleBar.vue';
import windowMixin from '../mixins/window';
import { Inject } from '../../util/injector';
import { CustomizationService } from '../../services/customization';
import { NavigationService } from '../../services/navigation';
import { AppService } from '../../services/app';
import { UserService } from '../../services/user';
import electron from 'electron';
import { StreamingService } from '../../services/streaming';
import LiveDock from '../LiveDock.vue';
import StudioFooter from '../StudioFooter.vue';
import CustomLoader from '../CustomLoader.vue';

const { remote } = electron;

@Component({
  mixins: [windowMixin],
  components: {
    TitleBar,
    TopNav,
    Studio,
    Dashboard,
    BrowseOverlays,
    Live,
    Onboarding,
    LiveDock,
    StudioFooter,
    CustomLoader,
  }
})
export default class Main extends Vue {
  title = `Streamlabs OBS - Version: ${remote.process.env.SLOBS_VERSION}`;

  @Inject() customizationService: CustomizationService;
  @Inject() navigationService: NavigationService;
  @Inject() appService: AppService;
  @Inject() streamingService: StreamingService;
  @Inject() userService: UserService;

  get page() {
    return this.navigationService.state.currentPage;
  }

  get params() {
    return this.navigationService.state.params;
  }

  get nightTheme() {
    return this.customizationService.nightMode;
  }

  get applicationLoading() {
    return this.appService.state.loading;
  }

  get isStreaming() {
    return this.streamingService.isStreaming;
  }

  get isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  get leftDock() {
    return this.customizationService.state.leftDock;
  }

  get isOnboarding() {
    return this.navigationService.state.currentPage === 'Onboarding';
  }

  /**
   * Only certain pages get locked out while the application
   * is loading.  Other pages are OK to keep using.
   */
  get shouldLockContent() {
    return (
      this.applicationLoading &&
      (this.navigationService.state.currentPage === 'Studio' ||
        this.navigationService.state.currentPage === 'Live')
    );
  }
}
