import { screen, render } from '@/test-utils';
import App from '../../src/pages/index';

describe('App', () => {
  it.skip('renders without crashing', () => {
    render(<App landingPage={undefined} page={undefined} locale={'fi'} />);
    expect(screen.getByText('Hobbies-Helsinki')).toBeInTheDocument();
  });
});
