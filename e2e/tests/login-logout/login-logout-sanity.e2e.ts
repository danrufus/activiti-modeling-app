 /*!
 * @license
 * Copyright 2019 Alfresco, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { testConfig } from '../../test.config';
import { LoginPage, LoginPageImplementation } from 'ama-testing/e2e';
import { AuthenticatedPage } from 'ama-testing/e2e';
import { Logger } from 'ama-testing/e2e';

describe('Application sanity check with Login and Logout', () => {

    const authenticatedPage = new AuthenticatedPage(testConfig);

    let loginPage: LoginPageImplementation;

    const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    beforeAll(async() => {
        Logger.info('Jasmine DEFAULT TIMEOUT: ', originalTimeout);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
        Logger.info('Jasmine UPDATED TIMEOUT: ', jasmine.DEFAULT_TIMEOUT_INTERVAL);
        loginPage = LoginPage.get();
        await loginPage.navigateTo();
    });

    it('[C310139] Login/Logout sanity check', async () => {
        for (let i = 0; i < 20; i++) {
            await loginPage.login(testConfig.ama.user, testConfig.ama.password);
            await expect(await authenticatedPage.isLoggedIn()).toBe(true);
            await authenticatedPage.logout();
            Logger.info('Login/logout - interaction ', i);
        }
    });

    afterAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        Logger.info('Jasmine RESTORED TIMEOUT: ', jasmine.DEFAULT_TIMEOUT_INTERVAL);
    });
});
