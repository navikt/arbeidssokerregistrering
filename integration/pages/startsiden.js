module.exports = {
    url: function() {
        return this.api.globals.launch_url;
    },
    elements: {
        start: '.startside',
        startRegistrering: "*[data-testid='start-registrering']",
    },
};