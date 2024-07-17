export const DASHBOARD_PATH = '/registrations';
export const HORIZONTAL_MAX_ITEM = 7;

export const MenuOrientation = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

export const ThemeMode = {
    LIGHT: 'light',
    DARK: 'dark'
};

export const ThemeDirection = {
    LTR: 'ltr',
    RTL: 'rtl'
};

export const API_END = 'http://127.0.0.1:5000/v1/';

const config = {
    menuOrientation: MenuOrientation.VERTICAL,
    miniDrawer: false,
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    mode: ThemeMode.LIGHT,
    presetColor: 'default',
    i18n: 'en',
    themeDirection: ThemeDirection.LTR,
    container: false
};

export default config;
