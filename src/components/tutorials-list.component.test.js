import React from 'react';
import nock from 'nock';
import { render, shallow, fireEvent,mount } from '@testing-library/react';

import TutorialsList from '../components/tutorials-list.component';
import { IntlProvider } from 'react-intl';
import MockAdapter from 'axios-mock-adapter';
import Faker from 'faker'
import TutorialDataService from '../services/tutorial.service';
//import thunk from 'redux-thunk';
//const mockStore = createMockStore(mws);
//const mws = [thunk];
//const store = mockStore({});
//let mockApi = new MockAdapter(TutorialDataService.findByTitle());
//let validAuthentication = {
//    name: Faker.internet.email(),
//    password: Faker.internet.password()
//}

//mockApi.spyOn('requests').reply((config)=>{
//    if (config.data === validAuthentication) {
//        return [200, userDetails];
//    }
//    return [400, 'Incorrect username and password'];
//})

it('displays user data', async () => {
    const scope = nock('/ec2458f2-1e24-41c8-b71b-0e701af7583d/Patient?name=abc')
        .get('/api')
        .once()
        .reply(200, {
            data: 'response',
        });

    var { getByText } = render(<TutorialsList />)
    var button = getByText("Search")

    expect(button).toHaveTextContent('Search')
    fireEvent.click(button)
    expect(button).toHaveTextContent('Search')


   

  
})
it('should validate remit codes ', () => {

    const state = {
        tutorials: [],
        currentTutorial: null,
        currentIndex: -1,
        searchTitle: "",
        patientFamilyHistory: []
    };

    const fakeUser = {
        name: "Joni Baez",
        age: "32",
        address: "123, Charming Avenue"
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    );

    global.fetch = jest.fn();
});
it('should validate remit family History ', () => {

    const state = {
        tutorials: [],
        currentTutorial: null,
        currentIndex: -1,
        searchTitle: "",
        patientFamilyHistory: []
    };

    const fakeUser = {
        name: "Joni Baez",
        age: "32",
        address: "123, Charming Avenue"
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    );

    global.fetch = jest.fn();
});
    // mocking an API success response
    //it('successful sign in with correct credentials',  () => {
    //     store.dispatch(searchTitle('abc'));
    //    expect(getActions()).toMatchSnapshot();
    //});

    //it('unsuccessful sign in with wrong credentials',  () => {
    //     store.dispatch(getpatiesntFamilyhistory('24355453'))
    //        .catch((error) => {
    //            expect(errorObject).toMatchSnapshot();
    //        });


    //})

