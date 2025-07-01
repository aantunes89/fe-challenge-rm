import { createAction, props } from '@ngrx/store';

export const toggleTheme = createAction('[Theme] Toggle Theme');

export const setDarkMode = createAction('[Theme] Set Dark Mode', props<{ isDarkMode: boolean }>());
