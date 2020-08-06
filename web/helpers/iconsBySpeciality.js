
export function getIconBySpeciality(speciality) {

    switch (speciality) {
        case 'Plat' :
        case 'Flat' :
            return require('./../assets/images/icons/discipline-plat.svg');
        case 'Trot' :
        case 'Trotting' :
            return require('./../assets/images/icons/discipline-trot.svg');
        case 'Mixte' :
        case 'Mixed' :
        case 'Mixte Galop' :
        case 'Mixed Gallop' :
            return require('./../assets/images/icons/discipline-trot-attele.svg');
        case 'Obstacle' :
            return require('./../assets/images/icons/discipline-obstacle.svg');
        default:
            return require('./../assets/images/icons/discipline-trot-attele.svg');
    }
}