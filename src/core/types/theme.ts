import { ThemedStyledProps } from 'styled-components/macro';

import { theme }             from '@core/config/theme';
import { Theme as ETheme }   from '@core/enums/theme';

export type ChangeTheme = {
    type: 'core/CHANGE_THEME';
    payload: ETheme;
}

export type ChangePreferColorScheme = {
    type: 'core/CHANGE_PREFER_COLOR_SCHEME';
    payload: ETheme;
}

export type ThemeState = {
    mode: ETheme;
}

export type Theme<T = {}> = ThemedStyledProps<T, typeof theme & { mode: ETheme, isDark: boolean }>
