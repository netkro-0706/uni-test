import React from 'react';
import ReactDOM from 'react-dom';

import { AriakeComponentsProvider } from './_providers';
import {
  GlobalNav,
  GlobalNavV3,
  CommonBanner,
  CommonQuestionnaire,
} from './_organisms';
import { CookiesProvider } from 'react-cookie';
import { isApp, GlobalStyle } from './_modules';

const bodyEl = document.body;
const bffVersion = bodyEl?.dataset?.bffVersion;

const globalHeaderEl = document.getElementById('globalHeader');
const commonBannerEl = document.getElementById('common_banner');
const commonQuestionnaireEl = document.getElementById('common_questionnaire');

if (!isApp() && bffVersion === 'v5') {
  globalHeaderEl &&
    ReactDOM.render(
      <AriakeComponentsProvider>
        <GlobalStyle />
        <GlobalNav />
      </AriakeComponentsProvider>,
      globalHeaderEl
    );
} else if (!isApp() && bffVersion === 'v3') {
  globalHeaderEl &&
    ReactDOM.render(
      <AriakeComponentsProvider>
        <CookiesProvider>
          <GlobalStyle />
          <GlobalNavV3 />
        </CookiesProvider>
      </AriakeComponentsProvider>,
      globalHeaderEl
    );
}

commonBannerEl && ReactDOM.render(<CommonBanner />, commonBannerEl);
commonQuestionnaireEl &&
  ReactDOM.render(<CommonQuestionnaire />, commonQuestionnaireEl);
