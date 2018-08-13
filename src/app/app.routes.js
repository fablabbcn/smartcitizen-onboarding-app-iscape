import wizardCtrl  from './wizard/scripts/wizard.controller';
import landingController  from './wizard/scripts/landing.controller';


import * as states  from './wizard';
import wizardStates from './wizard/wizard.json';
// tmp
import smartcitizenController from './wizard/base';

import { accesspointController, accesspointController_base }  from './wizard/scripts/accesspoint.controller';
import nameCtlr  from './wizard/scripts/name.controller';
import locationController  from './wizard/scripts/location.controller';
import accountController  from './wizard/scripts/account.controller';
import finalController  from './wizard/scripts/final.controller';


export default function routes($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {

    $stateProvider

    /** -- INTRO -- **/
        .state('wizard', {
            url: '/wizard',
            template: require('./wizard/wizard.html'),
            controller: wizardCtrl,
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
        .state('wizard.landing', {
            url: '/landing?lang',            //<< find way to remove these
            template: require('./wizard/landing.html'),
            controller: landingController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(0, $stateParams.lang);
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
            console.log($stateProvider.stateRegistry.get());

        });

        // .state('wizard.smart_citizen', {
        //     url: '/smart_citizen?lang',
        //     templateUrl: './wizard/collaborators.html',
        //     controller: smartCitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(1, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.smart_citizen2', {
        //     url: '/smart_citizen_brief?lang',
        //     templateUrl: './wizard/basic2.html',
        //     controller: smartCitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(2, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.basic2', {
        //     url: '/smart_citizen_brief2?lang',
        //     templateUrl: './wizard/basic2.html',
        //     controller: smartCitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(3, $stateParams.lang);
        //         }
        //     }
        // })
        //
        //
        // /** -- WHATS IN THE BOX -- **/
        // .state('wizard.basic', {
        //     url: '/whats_in_the_box?lang',
        //     templateUrl: './wizard/basic.html',
        //     controller: smartcitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(10, $stateParams.lang);
        //         }
        //     }
        // })

        // $stateProvider
        // .state('wizard.selectparts', {
        //     url: '/kit_parts?lang',
        //     template: require('./wizard/selectparts.html'),
        //     controller: statesController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(11, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.selectparts2', {
        //     url: '/case?lang',
        //     template: require('./wizard/selectparts2.html'),
        //     controller: statesController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(12, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.confirm_parts', {
        //     url: '/confirm_parts?lang',
        //     template: require('./wizard/confirm.html'),
        //     controller: smartcitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(13, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.kitbuild1', { // TODO - fix this output
        //     url: '/kitbuild_1?lang',
        //     template: require('./wizard/kitbuild1.html'),
        //     controller: smartcitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(14, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.kitbuild2', {
        //     url: '/kitbuild_2?lang',
        //     template: require('./wizard/kitbuild2.html'),
        //     controller: smartcitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(15, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.kitbuild3', {
        //     url: '/kitbuild_3?lang',
        //     template: require('./wizard/kitbuild3.html'),
        //     controller: smartcitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(16, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.kitbuild4', {
        //     url: '/kitbuild_4?lang',
        //     template: require('./wizard/kitbuild4.html'),
        //     controller: smartcitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(17, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.case1', {
        //     url: '/case_1?lang',
        //     template: require('./wizard/casing.html'),
        //     controller: smartcitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(18, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.case2', {
        //     url: '/case_2?lang',
        //     template: require('./wizard/casing.html'),
        //     controller: smartcitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(19, $stateParams.lang);
        //         }
        //     }
        // })
        //
        // .state('wizard.confirm_build', {
        //     url: '/confirm_build?lang',
        //     template: require('./wizard/confirm.html'),
        //     controller: smartcitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(20, $stateParams.lang);
        //         }
        //     }
        // })

        $stateProvider

        /** -- WIFI HANDSHAKE-- **/
        .state('wizard.accesspoint_pre', {
            url: '/accesspoint_pre?lang',
            template: require('./wizard/base/basic1.html'),
            controller: smartcitizenController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(30, $stateParams.lang);
                }
            }
        })
        .state('wizard.accesspoint_1', {
            url: '/accesspoint_1?lang',
            template: require('./wizard/prompted_entry.html'),
            controller: accesspointController_base,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(31, $stateParams.lang);
                }
            }
        })
        .state('wizard.accesspoint_2', {
            url: '/accesspoint_2?lang',
            template: require('./wizard/prompted_entry2_image.html'),
            controller: accesspointController_base,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(32, $stateParams.lang);
                }
            }
        })
        .state('wizard.ap_final', {
            url: '/ap_final?lang',
            template: require('./wizard/prompted_entry.html'),
            controller: accesspointController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(33, $stateParams.lang);
                }
            }
        })


        /** -- NAME -- **/
        .state('wizard.sensorName_prep', {
            url: '/sensorName_prep?lang',
            template: require('./wizard/base/basic1.html'),
            controller: smartcitizenController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(40, $stateParams.lang);
                }
            }
        })
        .state('wizard.sensorName', {
            url: '/sensorName?lang',
            template: require('./wizard/sensorName.html'),
            controller: nameCtlr,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(41, $stateParams.lang);
                }
            }
        })


        /** -- LOCATION -- **/
        .state('wizard.location_prep', {
            url: '/location_prep?lang',
            template: require('./wizard/location_prep.html'),
            controller: locationController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(50, $stateParams.lang);
                },
                tags: function (platform, $state) {
                    return platform.getTags().then(function (tags) {
                        return tags;
                    }, function () {
                        $state.go('unavailable');
                        //return true;
                    });
                }
            }
        })
        .state('wizard.location_map', {
            url: '/location_map?lang',
            template: require('./wizard/location_map.html'),
            controller: locationController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(51, $stateParams.lang);
                },
                tags: function (platform, $state) {
                    return platform.getTags().then(function (tags) {
                        return tags;
                    }, function () {
                        $state.go('unavailable');
                        //return true;
                    });
                }
            }
        })
         .state('wizard.location_tags', {
         url: '/location_tags?lang',
         template: require('./wizard/location_tags.html'),
         controller: locationController,
             resolve: {
                 scopePayload: function (SegueService, $stateParams) {
                     return SegueService.prep(52, $stateParams.lang);
                 },
                 tags: function (platform, $state) {
                     return platform.getTags().then(function (tags) {
                         return tags;
                     }, function () {
                         $state.go('unavailable');
                         //return true;
                     });
                 }
             }
         })
        .state('wizard.confirm_location', {
            url: '/confirm_location?lang',
            template: require('./wizard/selectparts/confirm.html'),
            controller: smartcitizenController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(53, $stateParams.lang);
                }
            }
        })



        /** -- HANDSHAKE -- **/
        // .state('wizard.wifi_enter', {
        //     url: '/wifi_enter?lang',
        //     template: require('./wizard/wifi_enter.html'),
        //     controller: handshakeController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(21, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.handshake', {
        //     url: '/handshake?lang',
        //     template: require('./wizard/handshake.html'),
        //     controller: handshakeController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(22, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.wifi_check', {
        //     url: '/wifi_check?lang',
        //     template: require('./wizard/wifi_check.html'),
        //     controller: handshakeController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(23, $stateParams.lang);
        //         }
        //     }
        // })
        // .state('wizard.confirm_handshake', {
        //     url: '/confirm_handshake?lang',
        //     template: require('./wizard/selectparts/confirm.html'),
        //     controller: smartcitizenController,
        //     resolve: {
        //         scopePayload: function (SegueService, $stateParams) {
        //             return SegueService.prep(24, $stateParams.lang);
        //         }
        //     }
        // })

        /** --  ACCOUNT -- **/
        .state('wizard.account1', {
            url: '/email?lang',
            template: require('./wizard/account1.html'),
            controller: accountController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(90, $stateParams.lang);
                }
            }
        })
        .state('wizard.login', {
            url: '/login?lang',
            template: require('./wizard/login.html'),
            controller: accountController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(91, $stateParams.lang);
                }
            }
        })
        .state('wizard.account2', {
            url: '/username?lang',
            template: require('./wizard/make_account1.html'),
            controller: accountController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(95, $stateParams.lang);
                }
            }
        })
        .state('wizard.account3', {
            url: '/password?lang',
            template: require('./wizard/make_account2.html'),
            controller: accountController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(96, $stateParams.lang);
                }
            }
        })
        .state('wizard.final', {
            url: '/final?lang',
            template: require('./wizard/final.html'),
            controller: finalController,
            resolve: {
                scopePayload: function (SegueService, $stateParams) {
                    return SegueService.prep(100, $stateParams.lang);
                }
            }
        })
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
  index
}, parentState) {
  const name = (parentState && parentState.stateName) ? `${parentState.stateName}.${stateName || index}` : stateName || index;
  console.log(url);
  return [`wizard.${name}`, {
    url: `/${url}`,
    template: states[template || (parentState && parentState.template)],
    controller: states[controller || (parentState && parentState.controller)],
    // resolve: { scopePayload: () => payload }
    resolve: { scopePayload: ['SegueService', (SegueService) => { console.log('coucou', index);return SegueService.prep(index, 'en')}] }
  }];
}
