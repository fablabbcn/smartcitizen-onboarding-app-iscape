import wizard from './wizard/wizard.html';
import { wizardController } from './wizard/wizard.controller';
import * as states  from './wizard';
import wizardStates from './wizard/wizard.json';
// tmp
import smartcitizenController from './wizard/base';


export default function routes($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {

    $stateProvider

    /** -- INTRO -- **/
        .state('wizard', {
            url: '/wizard',
            template: wizard,
            controller: wizardController,
            resolve: {
                session: function (platform, $state) {
                    return platform.getSession().then(function (session) {
                        platform.setSession(session);
                        //console.log(session);
                        // This ensure user will be always redirected temporary to avoid state issues
                        return session;
                    }, function () {
                        $state.go('unavailable');
                        //return true;
                    });
                }
            }
        })

        // JSON //

        wizardStates.forEach((state) => {
            if (!state.subStates || state.isState) {
              $stateProvider.state(...getStateArgs(state));
            } else if (state.subStates && state.subStates.length > 0) {
              state.subStates
              .map((subState) => getStateArgs(subState, state))
              .forEach((subStateArgs) => {
                $stateProvider.state(...subStateArgs);
              });
            }
        });


        $stateProvider

        .state('unavailable', {
            url: '/unavailable?lang',
            template: require('./wizard/unavailable.html'),
            controller: smartcitizenController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(0, $stateParams.lang);
                }
            }
        });

    /* Default state */
    $urlRouterProvider.otherwise('/wizard/landing?lang=eng');

    RestangularProvider.setBaseUrl('https://api.smartcitizen.me/v0');

    $locationProvider.html5Mode({ // <<breaks
        enabled: true,
        requireBase: false
    }).hashPrefix('!');
}

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'RestangularProvider'];

function getStateArgs({
  stateName,
  subStates,
  controller,
  template,
  url,
  isState,
  payload,
  index,
  resolve
}, parentState) {
  const name = (parentState && parentState.stateName) ? `${parentState.stateName}.${stateName || index}` : stateName || index;
  if (resolve) {
    Object.keys(resolve).forEach((key) => {
      const dependencies = resolve[key].dependencies;
      resolve[key] = new Function(...resolve[key].function);
      resolve[key].$inject = dependencies;
    })
  } else {
    resolve = {};
  }

  resolve.scopePayload = ['SegueService', (SegueService) =>  SegueService.prep(index, 'en')];
  return [`wizard.${name}`, {
    url: `/${url}`,
    template: states[template || (parentState && parentState.template)],
    controller: states[controller || (parentState && parentState.controller)],
    // resolve: { scopePayload: () => payload }
    resolve
  }];
}
