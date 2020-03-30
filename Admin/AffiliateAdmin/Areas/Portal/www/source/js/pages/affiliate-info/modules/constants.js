import { globalResource } from '../../../modules/globalResource';

export { globalResource };

export const statusList = {
    Favorite: "Favorite",
    Pending: "Pending",
    Approved: "Approved",
    Disapproved: "Disapproved",
    Closed: "Closed"
}

export const defaultSortBy = 1;

export const defaultSelectedColumnNumber = 2;

export const sortByList = {
    'Username': 1,
    'Registration Date': 2,
    'Approval Date': 3,
    'Balance B/F': 4,
    'Player': 5
}

export const headerText = {
    Index: '#',
    ParentAffName: 'Parent Affiliate',
    UserName: 'Username',
    Status: 'Status',
    FirstName: 'First Name',
    LastName: 'Last Name',
    Language: 'Language',
    Phone: 'Mobile Phone',
    Email: 'Email',
    RegistrationDateText: 'Registration Date',
    ApprovalDateText: 'Approval Date',
    CommissionGroup: 'Commission Group',
    BalanceBf: 'Balance B/F',
    Currency: 'Aff. Currency',
    PlayerUserName: 'Aff. Player',
    PlayerCurrency: 'Aff. Player Currency',
    Member: 'Player',
    NoOfSubAff: 'Sub-Affiliate',
    Password: 'Password',
}

export const resource = {
    Search: globalResource.Search,
    Space: ' - ',
    ReportName: 'AFFILIATE REPORT',
    AllCommGroups: 'All Comm Groups',
    AllLanguages: 'All Languages',
    AllStatuses: 'All Statuses',
    UsernameContains: 'USERNAME CONTAINS ',
    EmailContains: 'EMAIL CONTAINS ',
    AffIdContains: 'AFFILIATE ID ',
    SearchBy: 'Search By',
    SortBy: 'Sort By',
    AZ: 'A-Z',
    Apostrophe: "'",
    NA: 'N/A',
    DisplayedColumns: 'Displayed Columns'
}

export const regExp = {
    CheckAffId: "(^[1-9])(\\d*)$"
}

export const defaultState = {
    selectedCommGroup: 0,
    selectedLanguage: '',
    selectedStatus: '',
    userName: '',
    email: '',
    affId: '',
    parentAffName: '',
    selectedSortBy: defaultSortBy,
    isSortAscending: true
}