import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Mission from '../components/Mission';
import store from '../redux/store';

describe('Tests for <Mission /> component', () => {
  const title = 'Mission 1';
  const description = 'Mission description';
  const createMission = (reserved = false) => (
    <Mission
      missionId={'2'}
      missionName={title}
      description={description}
      odd={true}
      reserved={reserved}
    />
  );
  const wrapper = (component) => (
    <Provider store={store}>
      <table>
        <tbody>
          {component}
        </tbody>
      </table>
    </Provider>
  );
  it('Should render the content correctly', () => {
    render(wrapper(createMission()));
    expect(screen.getByText(title)).not.toBeNull();
    expect(screen.getByText('Mission description')).not.toBeNull();
  });

  it('Should display the reserve button when reserved is false', () => {
    render(wrapper(createMission()));
    expect(screen.queryByRole('button', { children: 'not a member' })).not.toBeNull();
    expect(() => screen.getByText('Leave Mission')).toThrow();
  });

  it('Should display the cancel reservation button when reserved is true', () => {
    render(wrapper(createMission(true)));
    expect(screen.queryByRole('button', { children: 'active member' })).not.toBeNull();
    expect(() => screen.getByText('Join Mission')).toThrow();
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrapper(createMission())).toJSON()).toMatchSnapshot();
  });
});