module.exports = {
    url: function() {
        return this.api.globals.launch_url;
    },
    elements: {
        start: '.startside',
        startRegistrering: {
            selector: "*[data-testid='start-registrering']"
        },
    },
};