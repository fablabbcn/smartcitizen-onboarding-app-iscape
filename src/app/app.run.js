export default function run($translateProvider) {
    $translateProvider.useStaticFilesLoader({
    prefix: 'assets/i18n/',
    suffix: '.json'
});
    $translateProvider.preferredLanguage('en');
}

run.$inject = ['$translateProvider'];
