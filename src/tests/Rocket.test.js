/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Rocket from '../components/Rocket';
import store from '../redux/store';

describe('Tests for <Rocket /> component', () => {
  const title = 'Falcon 1';
  const titleNoSpace = title.replace(/\s/g, '');
  const description = 'Falcon description';
  const createRocket = (reserved = false) => (
    <Rocket
      id={titleNoSpace}
      name={title}
      image={`${titleNoSpace}.jpg`}
      description={description}
      reserved={reserved}
    />
  );

  const wrapper = (component) => (
    <Provider store={store}>
      {component}
    </Provider>
  );

  it('Should render the content correctly', () => {
    render(wrapper(createRocket()));
    // Title is rendering correctly
    expect(screen.getByText(title)).not.toBeNull();
    // Description is rendering correctly
    expect(screen.getByText('Falcon description')).not.toBeNull();
    // Rocket image is rendering correctly
    expect(screen.queryByRole('img', { src: `${titleNoSpace}.jpg` })).not.toBeNull();
  });

  it('Should display the reserve button when reserved is false', () => {
    render(wrapper(createRocket()));
    // Reserve button is rendering correctly
    expect(screen.queryByRole('button', { children: 'Reserve Rocket' })).not.toBeNull();
    // Cancel reservation button should not be displayed
    expect(() => screen.getByText('Cancel Reservation')).toThrow();
  });

  it('Should display the cancel reservation button when reserved is true', () => {
    render(wrapper(createRocket(true)));
    // Cancel reservation button is rendering correctly
    expect(screen.queryByRole('button', { children: 'Cancel Reservation' })).not.toBeNull();
    // Reserve button should not be displayed
    expect(() => screen.getByText('Reserve Rocket')).toThrow();
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrapper(createRocket())).toJSON()).toMatchSnapshot();
  });
});
