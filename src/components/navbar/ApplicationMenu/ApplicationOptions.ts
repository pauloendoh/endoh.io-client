import { faChessKnight, faFunnelDollar, faGraduationCap, faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import PATHS from '../../../consts/PATHS';

// PE 3/3 
export interface IApplicationOption {
    applicationName: string,
    path: string,
    faIcon: IconDefinition
}

export const applicationOptions: IApplicationOption[] =
    [{
        applicationName: 'Home',
        path: '/',
        faIcon: faHome
    },
    {
        applicationName: 'Relearn',
        path: '/relearn',
        faIcon: faGraduationCap
    },
    {
        applicationName: 'Skillbase',
        path: '/skillbase',
        faIcon: faChessKnight
    },

    {
        applicationName: 'Monerate',
        path: '/monerate',
        faIcon: faFunnelDollar
    },

    ]

export const getCurrentApplicationByPath = (path: string): IApplicationOption => {
    if (path.startsWith(PATHS.monerate.index)) {
        return applicationOptions.find(option => option.applicationName === 'Monerate')
    }
    else if (path.startsWith(PATHS.relearn.index)) {
        return applicationOptions.find(option => option.applicationName === 'Relearn')
    }
    else if (path.startsWith(PATHS.skillbase.index)) {
        return applicationOptions.find(option => option.applicationName === 'Skillbase')
    }
    else {
        return applicationOptions.find(option => option.applicationName === 'Home')
    }
}