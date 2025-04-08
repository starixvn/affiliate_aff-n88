import { maxWidth, deviceTypesHasAll as deviceTypes, AllDevices, minDate } from '../../../../modules/constants';
import { headerText } from '../../referrers/modules/constants';
import { globalResource } from '../../../../modules/globalResource';

export { globalResource, deviceTypes, AllDevices, maxWidth, minDate }

export const headerTitle = {
    Page: 'Page',
    Language: 'Language',
    ...headerText
}
