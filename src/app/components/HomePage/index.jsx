// @flow
import React                         from 'react';
import type { ComponentType, Node }  from 'react';
import { Helmet }                    from 'react-helmet';
import { hot }                       from 'react-hot-loader/root';

import { Header }                    from 'ui/components';
import * as Styled                   from './styled';

const HomePage: ComponentType<{}> = (): Node => (
    <>
        <Helmet
            title="Home page"
        />
        <Header />
        <Styled.Container>
            <Styled.Text>Edit src/app/components/HomePage save and reload</Styled.Text>
            <Styled.Link to="/second">go to see the second page</Styled.Link>
        </Styled.Container>
    </>
);

export default hot(HomePage);
