import { createActionCreator } from '@core/utils/redux/action';
import { IsFirstRendering }    from '@core/types/location';

export const isFirstRenderingAction = createActionCreator<IsFirstRendering>()('core/IS_FIRST_RENDERING');
