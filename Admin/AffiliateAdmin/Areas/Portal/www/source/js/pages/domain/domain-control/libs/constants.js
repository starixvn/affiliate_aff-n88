import { globalResource } from '../../../../modules/globalResource';

export { globalResource };

export const headerText = {
    Index: '#',
    TargetCountry: 'Target Country',
    AffDomain: 'AffDomain',
    RedirectDomain: 'Redirect Domain',
    Creator: 'Creator',
    CreatedDate: 'Created Date',
    Status: 'Status',
    Edit: globalResource.Edit,
    Delete: globalResource.Delete
}

export const defaultState = {
    isInsert: true,
    isShowMessage: false,
    isSuccess: true,
    message: '',
    selectedDomain: null,
    affDomainList: null,
    redirectDomainList: null
}