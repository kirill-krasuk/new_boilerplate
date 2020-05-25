import { useEffect, useState } from 'react';

import { canUseDOM }           from '@core/utils/dom';

const mediaSSRMock = {
    matches       : false,
    addListener   : () => undefined,
    removeListener: () => undefined
};

export function useMedia(queries: string[], values: number[], defaultValue: number) {
    const mediaQueryLists = queries.map(q => (
        canUseDOM
            ? window.matchMedia(q)
            : mediaSSRMock
    ));

    const getValue = () => {
        const index = mediaQueryLists.findIndex(mql => mql.matches);

        return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
    };

    const [ value, setValue ] = useState(getValue);

    useEffect(() => {
        const handler = () => setValue(getValue);

        mediaQueryLists.forEach(mql => mql.addListener(handler));

        return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    }, []);

    return value;
}