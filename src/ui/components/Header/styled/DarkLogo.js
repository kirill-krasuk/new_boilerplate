import styled        from 'styled-components/macro';

import Logo          from 'svgs/new_dark_logo.svg';
import { LOGO_SIZE } from 'ui/constants/header';

export default styled(Logo)`
    height: ${ LOGO_SIZE };
    width: ${ LOGO_SIZE };
    margin: 20px 0;
`;
