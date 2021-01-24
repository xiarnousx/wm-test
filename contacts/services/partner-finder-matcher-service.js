const partners = require('../data/partners.json');

class PartnerFinderMatcherService {
    constructor() {}

    match(calculated) {
        let  matched = [];

        calculated.forEach((item) => {
            matched.push(...partners.filter((partner) => partner.id == item.id))
        });
    
        matched = matched.sort((a, b) => (a.organization < b.organization) ? -1 : 0);

        return matched;
    }
}

module.exports = PartnerFinderMatcherService;