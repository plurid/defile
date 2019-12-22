import React, {
    useState,
} from 'react';

import {
    PluridTextline,
} from '@plurid/plurid-ui-react';

import themes from '@plurid/plurid-themes';

import {
    StyledPageBar,
} from './styled';




const theme = themes.plurid;

interface PageBarOwnProperties {
    url: string;
    handleURL: any;
    handleURLChange: any;
}

const PageBar: React.FC<PageBarOwnProperties> = (properties) => {
    const {
        url,
        handleURL,
        handleURLChange,
    } = properties;

    // const [mouseOver, setMouseOver] = useState(false);

    return (
        <StyledPageBar
            // onMouseEnter={() => setMouseOver(true)}
            // onMouseLeave={() => setMouseOver(false)}
            // onMouseMove={() => !mouseOver ? setMouseOver(true) : undefined}
            // mouseOver={mouseOver}
            theme={theme}
        >
            <div>
            </div>

            <PluridTextline
                text={url}
                atChange={handleURL}
                atKeyDown={handleURLChange}
                enterIcon={true}
            />

            <div>
            </div>
        </StyledPageBar>
    );
}


export default PageBar;
