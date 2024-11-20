import {
    Avatar,
    Button,
    Card,
    Column,
    DataTable,
    Dropdown,
    Dialog,
    InputText,
    Password,
    PrimeVue,
    Toolbar,
    Tooltip,
    Textarea,
    Sidebar,
    FileUpload,
    Divider,
    TabView,
    TabPanel,
    ProgressSpinner,
    ScrollPanel,
    Image,
    VirtualScroller,
    Menu,
} from './components';

export default function regPrimeVue(app) {
    app.use(PrimeVue, { ripple: true });
    app.directive('PTooltip', Tooltip);
    app.component('PInputText', InputText);
    app.component('PDialog', Dialog);
    app.component('PButton', Button);
    app.component('PCard', Card);
    app.component('PToolbar', Toolbar);
    app.component('PAvatar', Avatar);
    app.component('PDataTable', DataTable);
    app.component('PTextarea', Textarea);
    app.component('PColumn', Column);
    app.component('PDropdown', Dropdown);
    app.component('PPassword', Password);
    app.component('PSidebar', Sidebar);
    app.component('PFileUpload', FileUpload);
    app.component('PDivider', Divider);
    app.component('PTabView', TabView);
    app.component('PTabPanel', TabPanel);
    app.component('PProgressSpinner', ProgressSpinner);
    app.component('PScrollPanel', ScrollPanel);
    app.component('PImage', Image);
    app.component('PVirtualScroller', VirtualScroller);
    app.component('PMenu', Menu);
}
